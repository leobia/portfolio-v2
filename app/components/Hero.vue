<script setup lang="ts">
interface HeroContent {
  eyebrow: string
  headline: { lead: string; accent: string }
  body: string
  tags?: string[]
  buttons: {
    primary: { label: string; href: string }
    secondary: { label: string; href: string }
  }
}

interface NowContent {
  updated: string
  rows: { label: string; value: string }[]
  availability: string
}

defineProps<{
  hero: HeroContent
  now: NowContent
}>()
</script>

<template>
  <header class="hero" id="top-hero">
    <div class="hero__intro">
      <p v-reveal class="hero__eyebrow">{{ hero.eyebrow }}</p>
      <h1 v-reveal="80" class="hero__headline">
        {{ hero.headline.lead }}
        <span class="hero__accent">{{ hero.headline.accent }}</span>
      </h1>
      <p v-reveal="160" class="hero__body">{{ hero.body }}</p>
      <div v-reveal="240" class="hero__actions">
        <a v-magnetic class="hero__btn hero__btn--primary" :href="hero.buttons.primary.href">
          {{ hero.buttons.primary.label }}
        </a>
        <a class="hero__btn hero__btn--secondary" :href="hero.buttons.secondary.href">
          {{ hero.buttons.secondary.label }}
        </a>
      </div>
    </div>

    <aside v-reveal="160" class="board">
      <div class="board__header">
        <span class="board__title">Now</span>
        <span class="board__updated">Updated {{ now.updated }}</span>
      </div>
      <dl class="board__rows">
        <div v-for="row in now.rows" :key="row.label" class="board__row">
          <dt class="board__label">{{ row.label }}</dt>
          <dd class="board__value">{{ row.value }}</dd>
        </div>
      </dl>
      <p class="board__availability">{{ now.availability }}</p>
    </aside>
  </header>
</template>

<style scoped lang="scss">
.hero {
  max-width: var(--max-width);
  margin: 0 auto;
  min-height: calc(100dvh - 68px - 41px); // viewport minus nav + ticker
  display: grid;
  grid-template-columns: 1.3fr 0.82fr;
  align-items: center;
  gap: 64px;
  padding: 64px var(--pad-x) 72px;
}

.hero__eyebrow {
  margin: 0 0 26px;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.04em;
  color: var(--accent-ink);
}

.hero__headline {
  font-size: clamp(2.8rem, 6.4vw, 5.4rem);
  font-weight: 800;
  line-height: 0.96;
  letter-spacing: -0.04em;
  margin: 0;
}

.hero__accent {
  color: var(--accent);
}

.hero__body {
  max-width: 46ch;
  margin: 30px 0 36px;
  font-size: 18px;
  line-height: 1.6;
  color: var(--ink-2);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.hero__btn {
  display: inline-flex;
  align-items: center;
  border-radius: var(--radius);
  padding: 15px 26px;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-decoration: none;
  white-space: nowrap;
  transition: background 150ms var(--ease), color 150ms var(--ease),
    border-color 150ms var(--ease);

  &:active {
    transform: translateY(1px);
  }
}

.hero__btn--primary {
  background: var(--accent);
  color: var(--on-accent);
  border: 1px solid var(--accent);

  &:hover {
    background: var(--accent-hover);
    border-color: var(--accent-hover);
  }
}

.hero__btn--secondary {
  background: transparent;
  color: var(--ink);
  border: 1px solid var(--ink);

  &:hover {
    background: var(--ink);
    color: var(--paper);
  }
}

// ── Now board ──
.board {
  background: var(--paper-2);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 28px 30px;
}

.board__header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--line);
}

.board__title {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.board__updated {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.02em;
  color: var(--muted);
}

.board__rows {
  margin: 0;
  padding: 22px 0 6px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.board__row {
  margin: 0;
}

.board__label {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 6px;
}

.board__value {
  margin: 0;
  font-size: 16px;
  color: var(--ink);
}

.board__availability {
  margin: 22px 0 0;
  display: inline-block;
  background: var(--accent-tint);
  border: 1px solid var(--accent-line);
  border-radius: var(--radius);
  padding: 9px 15px;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.04em;
  color: var(--accent-ink);
}

@media (max-width: 860px) {
  .hero {
    grid-template-columns: 1fr;
    min-height: 0;
    gap: 44px;
    padding: 48px var(--pad-x) 56px;
  }
}
</style>
