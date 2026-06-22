<script setup lang="ts">
import { ref, computed, watch } from "vue";
import CatRunner from "./games/CatRunner.vue";

type GameState = "idle" | "playing" | "over";

// Game registry. ponytail: add a new game = one entry here + its component.
const games = [
    {
        id: "cat-runner",
        name: "Cat Runner",
        component: CatRunner,
        help: [
            "↑ / Space — jump",
            "↓ — roll under the clouds",
            "Q — hit the chickens",
            "W — hit the cows",
            "Esc — quit",
        ],
    },
];

const currentId = ref(games[0]!.id);
const current = computed(() => games.find((g) => g.id === currentId.value)!);
const gameState = ref<GameState>("idle");
const gameRef = ref<{ start: () => void }>();
const showHelp = ref(false);

const idle = computed(() => gameState.value === "idle");
const active = computed(() => gameState.value !== "idle");

// Help only makes sense while idle; drop it when a game starts.
watch(active, (a) => {
    if (a) showHelp.value = false;
});
</script>

<template>
    <div class="ticker" :class="{ active, help: showHelp }">
        <component
            :is="current.component"
            :key="currentId"
            ref="gameRef"
            @state="gameState = $event"
        />

        <div v-if="idle" class="ticker__chrome">
            <button
                class="ticker__btn"
                :aria-expanded="showHelp"
                aria-label="How to play"
                @click="showHelp = !showHelp"
            >
                ?
            </button>
            <select
                v-model="currentId"
                class="ticker__sel"
                aria-label="Choose game"
            >
                <option v-for="g in games" :key="g.id" :value="g.id">
                    {{ g.name }}
                </option>
            </select>
            <button class="ticker__play" @click="gameRef?.start()">
                ▶ Play
            </button>
        </div>

        <div v-if="showHelp" class="ticker__helpbox" @click="showHelp = false">
            <strong>{{ current.name }}</strong>
            <ul>
                <li v-for="l in current.help" :key="l">{{ l }}</li>
            </ul>
        </div>
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

    &.active {
        height: 120px;
    }
    &.help {
        height: 160px;
    }
}

%chip {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--on-accent);
}

.ticker__chrome {
    position: absolute;
    top: 8px;
    right: 14px;
    display: flex;
    gap: 8px;
    align-items: center;
}

.ticker__btn {
    @extend %chip;
    width: 22px;
    height: 22px;
    display: grid;
    place-items: center;
    background: transparent;
    border: 1px solid currentColor;
    border-radius: 50%;
    cursor: pointer;

    &:hover {
        background: var(--on-accent);
        color: var(--accent);
    }
}

.ticker__sel {
    @extend %chip;
    padding: 4px 6px;
    background: transparent;
    border: 1px solid currentColor;
    cursor: pointer;
}

.ticker__play {
    @extend %chip;
    padding: 7px 14px;
    background: transparent;
    border: 1px solid currentColor;
    cursor: pointer;

    &:hover {
        background: var(--on-accent);
        color: var(--accent);
    }
}

.ticker__helpbox {
    @extend %chip;
    position: absolute;
    inset: 0;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
    padding: 16px 24px;
    background: var(--accent);
    cursor: pointer;

    strong {
        font-size: 12px;
        letter-spacing: 0.16em;
    }
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
        line-height: 1.7;
    }
}
</style>
