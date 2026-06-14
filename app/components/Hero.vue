<script setup lang="ts">
interface HeroContent {
  eyebrow: string
  headline: { lead: string; accent: string }
  body: string
  tags: string[]
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
  <div class="hero">
    <div class="hero__intro">
      <div class="hero__eyebrow">{{ hero.eyebrow }}</div>
      <h1 class="hero__headline">
        {{ hero.headline.lead }} <span class="hero__accent">{{ hero.headline.accent }}</span>
      </h1>
      <p class="hero__body">{{ hero.body }}</p>
      <div class="hero__chips">
        <span v-for="tag in hero.tags" :key="tag" class="hero__chip">{{ tag }}</span>
      </div>
      <div class="hero__actions">
        <a class="hero__btn hero__btn--primary" :href="hero.buttons.primary.href">{{ hero.buttons.primary.label }}</a>
        <a class="hero__btn hero__btn--secondary" :href="hero.buttons.secondary.href">{{ hero.buttons.secondary.label }}</a>
      </div>
    </div>

    <div class="board">
      <div class="board__header">
        <span class="board__title"><span class="board__dot">●</span> Now</span>
        <span class="board__updated">Updated {{ now.updated }}</span>
      </div>
      <div class="board__rows">
        <div v-for="row in now.rows" :key="row.label" class="board__row">
          <div class="board__label">{{ row.label }}</div>
          <div class="board__value">{{ row.value }}</div>
        </div>
      </div>
      <div class="board__availability">{{ now.availability }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero {
  display: grid;
  grid-template-columns: 1.18fr 0.82fr;
  gap: 56px;
  align-items: center;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 72px var(--pad-x) 64px;
}

.hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  background: var(--accent-tint-bg);
  border: 1px solid var(--accent-tint-border);
  border-radius: var(--radius-round);
  padding: 8px 16px;
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent-text);
}

.hero__headline {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 68px;
  line-height: 0.97;
  letter-spacing: -0.035em;
  margin: 26px 0 24px;
}

.hero__accent {
  color: var(--accent);
}

.hero__body {
  max-width: 500px;
  font-size: 17px;
  line-height: 1.62;
  color: var(--body);
  margin: 0 0 30px;
}

.hero__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 34px;
}

.hero__chip {
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-xs);
  padding: 9px 14px;
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--chip-text);
}

.hero__actions {
  display: flex;
  gap: 12px;
}

.hero__btn {
  border-radius: var(--radius-sm);
  padding: 16px 24px;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  transition: background 150ms ease, color 150ms ease;
}

.hero__btn--primary {
  background: var(--accent);
  color: #fff;
  border: 1px solid var(--accent);

  &:hover {
    background: var(--accent-hover);
    border-color: var(--accent-hover);
  }
}

.hero__btn--secondary {
  background: var(--surface);
  color: var(--ink);
  border: 1px solid var(--ink);

  &:hover {
    background: var(--ink);
    color: #fff;
  }
}

.board {
  background: var(--surface);
  border: 1px solid var(--border-strong-2);
  border-radius: var(--radius-lg);
  padding: 26px 28px;
  box-shadow: var(--shadow-board);
}

.board__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--border-soft-2);
}

.board__title {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.board__dot {
  color: var(--accent);
}

.board__updated {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--mono-faint-3);
}

.board__rows {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 22px 0 4px;
}

.board__label {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--mono-faint-2);
  margin-bottom: 5px;
}

.board__value {
  font-size: 15.5px;
  color: var(--value-text);
}

.board__availability {
  margin-top: 22px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--accent-tint-bg);
  border: 1px solid var(--accent-tint-border);
  border-radius: var(--radius-round);
  padding: 9px 15px;
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent-text);
}

@media (max-width: 900px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 48px var(--pad-x) 40px;
  }

  .hero__headline {
    font-size: 48px;
  }
}
</style>
