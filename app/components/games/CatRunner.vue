<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from "vue";

// Chrome-dino-style runner (the cat). Keyboard on desktop, on-screen pad on
// touch. Score is kept in localStorage. The host (Ticker) reacts to `state`
// to size the bar and show/hide its own chrome.
type GameState = "idle" | "playing" | "over";
const emit = defineEmits<{ state: [s: GameState] }>();

const state = ref<GameState>("idle");
const score = ref(0);
const best = ref(0);
const isTouch = ref(false);
const cv = ref<HTMLCanvasElement>();

watch(state, (s) => emit("state", s), { immediate: true });

const pad = (n: number) => Math.floor(n).toString().padStart(5, "0");

// Host (Ticker) renders the Play button in its chrome row and calls this.
defineExpose({ start: () => game.start() });

// Filled in onMounted; the template buttons call through these.
const game = {
    start: () => {},
    exit: () => {},
    tap: () => {},
    jump: () => {},
    roll: (_on: boolean) => {},
    hitChicken: () => {},
    hitCow: () => {},
};

let raf = 0;
let teardown = () => {};

onMounted(() => {
    isTouch.value = matchMedia("(pointer: coarse)").matches;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    best.value = Number(localStorage.getItem("cat-runner-best") || 0);

    const canvas = cv.value!;
    const ctx = canvas.getContext("2d")!;

    // 32px-frame sheets. ponytail: swap the files in /public/game to restyle.
    const FR = 32;
    const defs: Record<string, { src: string; frames: number; fps: number }> = {
        idle: { src: "/game/idle.png", frames: 8, fps: 6 },
        run: { src: "/game/run.png", frames: 10, fps: 12 },
        jump: { src: "/game/jump.png", frames: 4, fps: 12 },
        fall: { src: "/game/fall.png", frames: 4, fps: 12 },
        roll: { src: "/game/roll.png", frames: 8, fps: 18 },
        death: { src: "/game/death.png", frames: 9, fps: 14 },
        attack: { src: "/game/attack.png", frames: 6, fps: 15 },
        jumpAttack: { src: "/game/jump-attack.png", frames: 6, fps: 15 },
    };
    const imgs: Record<string, HTMLImageElement> = {};
    for (const k in defs) {
        const im = new Image();
        im.src = defs[k]!.src;
        imgs[k] = im;
    }
    // Tile + enemy sheets. Ground/cloud tiles are 18px; enemies are frame-sheets.
    const tile = (n: string) => {
        const im = new Image();
        im.src = `/game/${n}.png`;
        return im;
    };
    const ground = {
        single: tile("ground-single"),
        left: tile("ground-left"),
        center: tile("ground-center"),
        right: tile("ground-right"),
    };
    const cloud = {
        single: tile("cloud-single"),
        left: tile("cloud-left"),
        center: tile("cloud-center"),
        right: tile("cloud-right"),
    };
    const chickenImg = tile("chickens"); // 16px frames, walk = frames 0,1
    const cowImg = tile("cows"); // 32px frames, walk = frames 0,1

    // Tuning knobs (px, px/s). ponytail: these are the calibration dials — tweak freely.
    const CAT = 48,
        CATX = 44,
        GPAD = 14,
        FOOT = 6;
    const GRAV = 1800,
        JUMP = 470;
    const HB = { w: 26, stand: 40, roll: 20 };
    const TILE = 24; // ground/cloud tile display size
    const AIRGAP = 22; // cloud band sits this high → roll under it (min for duck)
    const ENEMY = { chW: 22, chH: 20, cowW: 30, cowH: 18 }; // hitbox
    const ATTACK_DUR = 0.4,
        ATTACK_REACH = 42;
    const SPEED0 = 210,
        SPEEDMAX = 470,
        RAMP = 11;
    const SP_MIN = 0.9,
        SP_MAX = 1.7;

    type Kind = "ground" | "air" | "chicken" | "cow";
    type Ob = {
        kind: Kind;
        x: number;
        n: number;
        hp: number;
        dead?: boolean;
        hit?: number; // last swing id that hit this enemy (one hit per swing)
    };

    let airY = 0,
        vy = 0,
        grounded = true,
        rolling = false;
    let speed = SPEED0,
        elapsed = 0,
        animT = 0,
        deathT = 0,
        spawnIn = 1,
        attackT = 0,
        swing = 0,
        attackTarget: "chicken" | "cow" = "chicken",
        attackKey: "attack" | "jumpAttack" = "attack";
    let obstacles: Ob[] = [];

    // n tiles (1=single, 2/3 = wider) scaled by how fast the game is running.
    function tilesForSpeed() {
        const p = (speed - SPEED0) / (SPEEDMAX - SPEED0);
        let n = 1;
        if (Math.random() < p) n++;
        if (Math.random() < p * 0.6) n++;
        return n;
    }
    // Geometry of an obstacle's hitbox/draw box for a given ground line.
    function box(o: Ob, groundY: number) {
        if (o.kind === "ground")
            return { w: o.n * TILE, bot: groundY, top: groundY - TILE };
        if (o.kind === "air")
            return {
                w: o.n * TILE,
                bot: groundY - AIRGAP,
                top: groundY - AIRGAP - TILE,
            };
        const w = o.kind === "cow" ? ENEMY.cowW : ENEMY.chW;
        const h = o.kind === "cow" ? ENEMY.cowH : ENEMY.chH;
        return { w, bot: groundY, top: groundY - h };
    }

    function reset() {
        airY = 0;
        vy = 0;
        grounded = true;
        rolling = false;
        speed = SPEED0;
        elapsed = 0;
        deathT = 0;
        spawnIn = 1;
        attackT = 0;
        obstacles = [];
        score.value = 0;
    }
    // Q kills only chickens; W kills only cows. Each key targets one enemy type.
    function attack(which: "attack" | "jumpAttack") {
        attackT = ATTACK_DUR;
        attackKey = which;
        attackTarget = which === "jumpAttack" ? "cow" : "chicken";
        swing++; // hit pass runs each frame of the swing; dedup by swing id
    }
    // Melee active for the whole swing (forgiving), one hit per enemy per swing.
    function attackHits() {
        const aL = CATX,
            aR = CATX + CAT + ATTACK_REACH;
        for (const o of obstacles) {
            if (o.kind !== attackTarget) continue; // only the matching enemy
            if (o.dead || o.hit === swing) continue;
            const w = o.kind === "cow" ? ENEMY.cowW : ENEMY.chW;
            if (o.x + w > aL && o.x < aR) {
                o.hit = swing;
                o.dead = true;
                score.value += 20;
            }
        }
    }
    function start() {
        reset();
        state.value = "playing";
    }
    function exit() {
        state.value = "idle";
    }
    function jump() {
        if (grounded) {
            grounded = false;
            vy = JUMP;
        }
    }
    function over() {
        state.value = "over";
        deathT = 0;
        if (score.value > best.value) {
            best.value = Math.floor(score.value);
            localStorage.setItem("cat-runner-best", String(best.value));
        }
    }
    function tap() {
        if (state.value === "over") start();
        else if (state.value === "playing") jump();
    }
    game.start = start;
    game.exit = exit;
    game.tap = tap;
    game.jump = jump;
    game.roll = (on: boolean) => {
        rolling = on;
    };
    game.hitChicken = () => attack("attack");
    game.hitCow = () => attack("jumpAttack");

    function onKey(e: KeyboardEvent, down: boolean) {
        const s = state.value;
        const c = e.code;
        if (
            (s === "playing" || s === "over") &&
            (c === "Space" || c === "ArrowUp" || c === "ArrowDown")
        )
            e.preventDefault();
        if (!down) {
            if (c === "ArrowDown") rolling = false;
            return;
        }
        if (c === "Escape") {
            if (s !== "idle") exit();
            return;
        }
        if (s === "over") {
            if (c === "Space" || c === "ArrowUp") start();
            return;
        }
        if (s === "playing") {
            if (c === "Space" || c === "ArrowUp") jump();
            else if (c === "ArrowDown") rolling = true;
            else if (c === "KeyQ" && !e.repeat) attack("attack");
            else if (c === "KeyW" && !e.repeat) attack("jumpAttack");
        }
    }
    const kd = (e: KeyboardEvent) => onKey(e, true);
    const ku = (e: KeyboardEvent) => onKey(e, false);
    addEventListener("keydown", kd);
    addEventListener("keyup", ku);

    let last = performance.now();
    function loop(now: number) {
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        const w = canvas.clientWidth,
            h = canvas.clientHeight;
        const dpr = Math.min(2, devicePixelRatio || 1);
        if (
            canvas.width !== Math.round(w * dpr) ||
            canvas.height !== Math.round(h * dpr)
        ) {
            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
        }
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.imageSmoothingEnabled = false;
        ctx.clearRect(0, 0, w, h);
        const groundY = h - GPAD;
        animT += dt;

        if (attackT > 0) attackT = Math.max(0, attackT - dt);

        if (state.value === "playing") {
            elapsed += dt;
            score.value += dt * 12;
            speed = Math.min(SPEEDMAX, SPEED0 + elapsed * RAMP);
            if (!grounded) {
                vy -= GRAV * dt;
                airY += vy * dt;
                if (airY <= 0) {
                    airY = 0;
                    vy = 0;
                    grounded = true;
                }
            }

            spawnIn -= dt;
            if (spawnIn <= 0) {
                const r = Math.random();
                let kind: Kind;
                if (elapsed > 8 && r < 0.25) kind = "air";
                else if (elapsed > 5 && r < 0.6)
                    kind = Math.random() < 0.55 ? "chicken" : "cow";
                else kind = "ground";
                obstacles.push({
                    kind,
                    x: w + TILE,
                    n: kind === "ground" || kind === "air" ? tilesForSpeed() : 1,
                    hp: kind === "cow" ? 2 : 1,
                });
                spawnIn = SP_MIN + Math.random() * (SP_MAX - SP_MIN);
            }

            if (attackT > 0) attackHits();

            const catBottom = groundY - airY;
            const catTop =
                catBottom - (rolling && grounded ? HB.roll : HB.stand);
            const catL = CATX + (CAT - HB.w) / 2,
                catR = catL + HB.w;
            for (const o of obstacles) {
                o.x -= speed * dt;
                if (o.dead) continue;
                const b = box(o, groundY);
                const oL = o.x + 3,
                    oR = o.x + b.w - 3;
                if (
                    oR > catL &&
                    oL < catR &&
                    b.bot > catTop &&
                    b.top < catBottom
                ) {
                    over();
                    break;
                }
            }
            obstacles = obstacles.filter((o) => !o.dead && o.x > -TILE * 3);
        }

        // choose sprite + frame
        let key: string, frame: number;
        if (state.value === "over") {
            deathT += dt;
            key = "death";
            frame = Math.min(
                Math.floor(deathT * defs.death!.fps),
                defs.death!.frames - 1,
            );
        } else if (state.value === "idle") {
            key = reduced ? "idle" : "run";
            frame = reduced
                ? 0
                : Math.floor(animT * defs.run!.fps) % defs.run!.frames;
        } else if (attackT > 0) {
            key = attackKey;
            const d = defs[key]!;
            frame = Math.min(
                d.frames - 1,
                Math.floor((ATTACK_DUR - attackT) * d.fps),
            );
        } else {
            key = !grounded
                ? vy > 0
                    ? "jump"
                    : "fall"
                : rolling
                  ? "roll"
                  : "run";
            const d = defs[key]!;
            frame = Math.floor(animT * d.fps) % d.frames;
        }

        // ground line + scrolling ticks (imply motion)
        ctx.strokeStyle = "rgba(0,0,0,.28)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, groundY + 0.5);
        ctx.lineTo(w, groundY + 0.5);
        ctx.stroke();
        const scroll =
            state.value === "playing" ? elapsed * speed : animT * 120;
        ctx.fillStyle = "rgba(0,0,0,.18)";
        for (let x = -(scroll % 24); x < w; x += 24)
            ctx.fillRect(x, groundY + 4, 10, 2);

        const wf = (n: number) => Math.floor(animT * 10) % n; // enemy walk frame
        for (const o of obstacles) {
            if (o.dead) continue;
            const b = box(o, groundY);
            if (o.kind === "ground" || o.kind === "air") {
                const set = o.kind === "ground" ? ground : cloud;
                for (let i = 0; i < o.n; i++) {
                    const im =
                        o.n === 1
                            ? set.single
                            : i === 0
                              ? set.left
                              : i === o.n - 1
                                ? set.right
                                : set.center;
                    if (im.complete)
                        ctx.drawImage(im, o.x + i * TILE, b.top, TILE, TILE);
                }
            } else if (o.kind === "chicken") {
                // 6-frame walk strip, pre-mirrored (see public/game).
                if (chickenImg.complete)
                    ctx.drawImage(
                        chickenImg,
                        wf(6) * 16,
                        0,
                        16,
                        16,
                        o.x,
                        b.top,
                        ENEMY.chW,
                        ENEMY.chH,
                    );
            } else if (cowImg.complete) {
                // 5-frame walk strip; feet sit low in the cell → bottom-align.
                ctx.drawImage(
                    cowImg,
                    wf(5) * 32,
                    0,
                    32,
                    32,
                    o.x - 2,
                    groundY + 6 - 34,
                    34,
                    34,
                );
            }
        }

        const im = imgs[key];
        // Attack sheets use 64px-wide frames (cat lunges past its 32px box);
        // draw them at 1.5× into a 96px box centred on the cat's normal slot.
        const atk = key === "attack" || key === "jumpAttack";
        const sw = atk ? 64 : FR;
        const dw = atk ? 96 : CAT;
        const dx = atk ? CATX - 24 : CATX;
        if (im?.complete)
            ctx.drawImage(
                im,
                frame * sw,
                0,
                sw,
                FR,
                dx,
                groundY - CAT + FOOT - airY,
                dw,
                CAT,
            );

        raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    teardown = () => {
        removeEventListener("keydown", kd);
        removeEventListener("keyup", ku);
    };
});

onBeforeUnmount(() => {
    cancelAnimationFrame(raf);
    teardown();
});
</script>

<template>
    <div class="cr">
        <canvas
            ref="cv"
            class="cr__cv"
            aria-hidden="true"
            @pointerdown="game.tap()"
        />

        <div v-if="state !== 'idle'" class="cr__hud">
            {{ pad(score) }} <span>HI</span> {{ pad(best) }}
        </div>
        <button
            v-if="state !== 'idle'"
            class="cr__close"
            aria-label="Close game"
            @click="game.exit()"
        >
            ✕
        </button>
        <div v-if="state === 'over'" class="cr__over">
            Game Over — ↑ / Space
        </div>

        <div v-if="isTouch && state === 'playing'" class="cr__pad">
            <button
                aria-label="Jump"
                @pointerdown.prevent="game.jump()"
            >
                ↑
            </button>
            <button
                aria-label="Roll"
                @pointerdown.prevent="game.roll(true)"
                @pointerup.prevent="game.roll(false)"
                @pointerleave="game.roll(false)"
                @pointercancel="game.roll(false)"
            >
                ↓
            </button>
            <button aria-label="Hit chicken" @pointerdown.prevent="game.hitChicken()">
                🐔
            </button>
            <button aria-label="Hit cow" @pointerdown.prevent="game.hitCow()">
                🐄
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.cr {
    position: absolute;
    inset: 0;
}

.cr__cv {
    display: block;
    width: 100%;
    height: 100%;
    touch-action: manipulation;
}

%chip {
    position: absolute;
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--on-accent);
}

.cr__hud {
    @extend %chip;
    top: 8px;
    left: 16px;

    span {
        opacity: 0.55;
        margin: 0 2px;
    }
}

.cr__close {
    @extend %chip;
    top: 6px;
    right: 12px;
    padding: 2px 6px;
    background: transparent;
    border: none;
    cursor: pointer;
}

.cr__over {
    @extend %chip;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: 700;
}

// ponytail: first-pass touch pad — bottom-right so the cat stays visible.
.cr__pad {
    position: absolute;
    right: 8px;
    bottom: 8px;
    display: flex;
    gap: 8px;

    button {
        width: 40px;
        height: 40px;
        display: grid;
        place-items: center;
        font-size: 18px;
        line-height: 1;
        color: var(--on-accent);
        background: color-mix(in srgb, var(--accent) 70%, transparent);
        border: 1px solid currentColor;
        border-radius: 8px;
        cursor: pointer;
        touch-action: none;
        user-select: none;
    }
}
</style>
