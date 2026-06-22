<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// The ticker is now a Chrome-dino-style runner (the cat). Desktop only;
// on touch devices it just shows the idle cat. Score is kept in localStorage.
const state = ref<'idle' | 'playing' | 'over'>('idle')
const score = ref(0)
const best = ref(0)
const isTouch = ref(false)
const cv = ref<HTMLCanvasElement>()

const showPlay = computed(() => !isTouch.value && state.value === 'idle')
const pad = (n: number) => Math.floor(n).toString().padStart(5, '0')

// Filled in onMounted; the template buttons call through these.
const game = { start: () => {}, exit: () => {}, tap: () => {} }

let raf = 0
let teardown = () => {}

onMounted(() => {
  isTouch.value = matchMedia('(pointer: coarse)').matches
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  best.value = Number(localStorage.getItem('cat-runner-best') || 0)

  const canvas = cv.value!
  const ctx = canvas.getContext('2d')!

  // 32px-frame sheets. ponytail: swap the files in /public/game to restyle.
  const FR = 32
  const defs: Record<string, { src: string; frames: number; fps: number }> = {
    idle: { src: '/game/idle.png', frames: 8, fps: 6 },
    run: { src: '/game/run.png', frames: 10, fps: 12 },
    jump: { src: '/game/jump.png', frames: 4, fps: 12 },
    fall: { src: '/game/fall.png', frames: 4, fps: 12 },
    roll: { src: '/game/roll.png', frames: 8, fps: 18 },
    death: { src: '/game/death.png', frames: 9, fps: 14 },
  }
  const imgs: Record<string, HTMLImageElement> = {}
  for (const k in defs) { const im = new Image(); im.src = defs[k]!.src; imgs[k] = im }
  const obImg = new Image(); obImg.src = '/game/obstacle.png'

  // Tuning knobs (px, px/s). ponytail: these are the calibration dials — tweak freely.
  const CAT = 48, CATX = 44, GPAD = 14, FOOT = 6
  const GRAV = 1800, JUMP = 470
  const HB = { w: 26, stand: 40, roll: 20 }
  const OB = 26
  const SPEED0 = 210, SPEEDMAX = 470, RAMP = 11
  const SP_MIN = 0.9, SP_MAX = 1.7

  let airY = 0, vy = 0, grounded = true, rolling = false
  let speed = SPEED0, elapsed = 0, animT = 0, deathT = 0, spawnIn = 1
  let obstacles: { x: number; fly: boolean }[] = []

  function reset() {
    airY = 0; vy = 0; grounded = true; rolling = false
    speed = SPEED0; elapsed = 0; deathT = 0; spawnIn = 1
    obstacles = []; score.value = 0
  }
  function start() { reset(); state.value = 'playing' }
  function exit() { state.value = 'idle' }
  function jump() { if (grounded) { grounded = false; vy = JUMP } }
  function over() {
    state.value = 'over'; deathT = 0
    if (score.value > best.value) {
      best.value = Math.floor(score.value)
      localStorage.setItem('cat-runner-best', String(best.value))
    }
  }
  function tap() {
    if (state.value === 'over') start()
    else if (state.value === 'playing') jump()
  }
  game.start = start; game.exit = exit; game.tap = tap

  function onKey(e: KeyboardEvent, down: boolean) {
    const s = state.value
    const c = e.code
    if ((s === 'playing' || s === 'over') && (c === 'Space' || c === 'ArrowUp' || c === 'ArrowDown')) e.preventDefault()
    if (!down) { if (c === 'ArrowDown') rolling = false; return }
    if (c === 'Escape') { if (s !== 'idle') exit(); return }
    if (s === 'over') { if (c === 'Space' || c === 'ArrowUp') start(); return }
    if (s === 'playing') {
      if (c === 'Space' || c === 'ArrowUp') jump()
      else if (c === 'ArrowDown') rolling = true
    }
  }
  const kd = (e: KeyboardEvent) => onKey(e, true)
  const ku = (e: KeyboardEvent) => onKey(e, false)
  addEventListener('keydown', kd)
  addEventListener('keyup', ku)

  let last = performance.now()
  function loop(now: number) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now
    const w = canvas.clientWidth, h = canvas.clientHeight
    const dpr = Math.min(2, devicePixelRatio || 1)
    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr)
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.imageSmoothingEnabled = false
    ctx.clearRect(0, 0, w, h)
    const groundY = h - GPAD
    animT += dt

    if (state.value === 'playing') {
      elapsed += dt
      score.value += dt * 12
      speed = Math.min(SPEEDMAX, SPEED0 + elapsed * RAMP)
      if (!grounded) { vy -= GRAV * dt; airY += vy * dt; if (airY <= 0) { airY = 0; vy = 0; grounded = true } }

      spawnIn -= dt
      if (spawnIn <= 0) {
        const fly = elapsed > 8 && Math.random() < 0.33
        obstacles.push({ x: w + OB, fly })
        spawnIn = SP_MIN + Math.random() * (SP_MAX - SP_MIN)
      }

      const catBottom = groundY - airY
      const catTop = catBottom - (rolling && grounded ? HB.roll : HB.stand)
      const catL = CATX + (CAT - HB.w) / 2, catR = catL + HB.w
      for (const o of obstacles) {
        o.x -= speed * dt
        const oL = o.x + 3, oR = o.x + OB - 3
        const oBot = o.fly ? groundY - (HB.roll + 8) : groundY
        const oTop = oBot - OB
        if (oR > catL && oL < catR && oBot > catTop && oTop < catBottom) { over(); break }
      }
      obstacles = obstacles.filter(o => o.x > -OB)
    }

    // choose sprite + frame
    let key: string, frame: number
    if (state.value === 'over') {
      deathT += dt; key = 'death'
      frame = Math.min(Math.floor(deathT * defs.death!.fps), defs.death!.frames - 1)
    } else if (state.value === 'idle') {
      key = reduced ? 'idle' : 'run'
      frame = reduced ? 0 : Math.floor(animT * defs.run!.fps) % defs.run!.frames
    } else {
      key = !grounded ? (vy > 0 ? 'jump' : 'fall') : rolling ? 'roll' : 'run'
      const d = defs[key]!
      frame = Math.floor(animT * d.fps) % d.frames
    }

    // ground line + scrolling ticks (imply motion)
    ctx.strokeStyle = 'rgba(0,0,0,.28)'; ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(0, groundY + 0.5); ctx.lineTo(w, groundY + 0.5); ctx.stroke()
    const scroll = state.value === 'playing' ? elapsed * speed : animT * 120
    ctx.fillStyle = 'rgba(0,0,0,.18)'
    for (let x = -(scroll % 24); x < w; x += 24) ctx.fillRect(x, groundY + 4, 10, 2)

    if (obImg.complete) for (const o of obstacles) {
      const oy = (o.fly ? groundY - (HB.roll + 8) : groundY) - OB
      ctx.drawImage(obImg, 0, 0, 18, 18, o.x, oy, OB, OB)
    }

    const im = imgs[key]
    if (im?.complete) ctx.drawImage(im, frame * FR, 0, FR, FR, CATX, groundY - CAT + FOOT - airY, CAT, CAT)

    raf = requestAnimationFrame(loop)
  }
  raf = requestAnimationFrame(loop)

  teardown = () => { removeEventListener('keydown', kd); removeEventListener('keyup', ku) }
})

onBeforeUnmount(() => { cancelAnimationFrame(raf); teardown() })
</script>

<template>
  <div class="ticker" :class="state">
    <canvas ref="cv" class="ticker__cv" aria-hidden="true" @pointerdown="game.tap()" />

    <button v-if="showPlay" class="ticker__play" @click="game.start()">▶ Play</button>

    <div v-if="state !== 'idle'" class="ticker__hud">{{ pad(score) }} <span>HI</span> {{ pad(best) }}</div>
    <button v-if="state !== 'idle'" class="ticker__close" aria-label="Close game" @click="game.exit()">✕</button>
    <div v-if="state === 'over'" class="ticker__over">Game Over — ↑ / Space</div>
  </div>
</template>

<style scoped lang="scss">
.ticker {
  position: relative;
  height: 60px;
  background: var(--accent);
  color: var(--on-accent);
  overflow: hidden;
  border-bottom: 1px solid var(--ink);
  transition: height 0.25s ease;

  &.playing,
  &.over {
    height: 120px;
  }
}

.ticker__cv {
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

.ticker__play {
  @extend %chip;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  padding: 7px 14px;
  background: transparent;
  border: 1px solid currentColor;
  cursor: pointer;

  &:hover {
    background: var(--on-accent);
    color: var(--accent);
  }
}

.ticker__hud {
  @extend %chip;
  top: 8px;
  left: 16px;

  span {
    opacity: 0.55;
    margin: 0 2px;
  }
}

.ticker__close {
  @extend %chip;
  top: 6px;
  right: 12px;
  padding: 2px 6px;
  background: transparent;
  border: none;
  cursor: pointer;
}

.ticker__over {
  @extend %chip;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 700;
}
</style>
