<script setup lang="ts">
interface Entry {
  date: string
  title: string
  description: string
}

interface JourneyContent {
  label: string
  tagline: string
  entries: Entry[]
}

defineProps<{ journey: JourneyContent }>()
</script>

<template>
  <section id="journey" class="journey">
    <div class="journey__header">
      <span class="journey__label">{{ journey.label }}</span>
      <span class="journey__tagline">{{ journey.tagline }}</span>
    </div>

    <ol class="journey__list">
      <li v-for="entry in journey.entries" :key="entry.date + entry.title" class="journey__entry">
        <span class="journey__date">{{ entry.date }}</span>
        <div class="journey__body">
          <h3 class="journey__title">{{ entry.title }}</h3>
          <p class="journey__desc">{{ entry.description }}</p>
        </div>
      </li>
    </ol>
  </section>
</template>

<style scoped lang="scss">
.journey {
  max-width: var(--max-width);
  margin: 0 auto;
}

.journey__header {
  border-top: 1px solid var(--border-soft);
  margin: 0 var(--pad-x);
  padding: 28px 0 8px;
  display: flex;
  align-items: baseline;
  gap: 14px;
}

.journey__label {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent-text);
}

.journey__tagline {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--mono-faint);
}

.journey__list {
  list-style: none;
  margin: 0;
  padding: 24px var(--pad-x) 72px;
}

.journey__entry {
  position: relative;
  display: grid;
  grid-template-columns: 96px 1fr;
  gap: 28px;
  padding: 0 0 36px 0;

  &::before {
    content: '';
    position: absolute;
    left: 109px;
    top: 8px;
    bottom: -8px;
    width: 2px;
    background: var(--index-gray);
  }

  &:last-child::before {
    display: none;
  }

  &::after {
    content: '';
    position: absolute;
    left: 107px;
    top: 6px;
    width: 7px;
    height: 7px;
    border-radius: var(--radius-round);
    background: var(--accent);
  }
}

.journey__date {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--mono-muted);
  padding-top: 1px;
}

.journey__body {
  padding-left: 22px;
}

.journey__title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 19px;
  margin: 0 0 6px;
  color: var(--ink);
}

.journey__desc {
  font-size: 15px;
  line-height: 1.55;
  color: var(--body-2);
  margin: 0;
}

@media (max-width: 700px) {
  .journey__entry {
    grid-template-columns: 64px 1fr;
    gap: 14px;

    &::before {
      left: 77px;
    }

    &::after {
      left: 75px;
    }
  }

  .journey__body {
    padding-left: 16px;
  }
}
</style>
