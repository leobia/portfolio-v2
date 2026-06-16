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
    <h2 v-reveal class="journey__title">{{ journey.label }}</h2>

    <ol class="journey__list">
      <li
        v-for="(entry, i) in journey.entries"
        :key="entry.date + entry.title"
        v-reveal="i * 70"
        class="entry"
      >
        <span class="entry__date">{{ entry.date }}</span>
        <div class="entry__body">
          <h3 class="entry__role">{{ entry.title }}</h3>
          <p class="entry__desc">{{ entry.description }}</p>
        </div>
      </li>
    </ol>
  </section>
</template>

<style scoped lang="scss">
.journey {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 96px var(--pad-x);
  border-top: 1px solid var(--line);
}

.journey__title {
  font-size: clamp(2.2rem, 5vw, 3.6rem);
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 1;
  margin-bottom: 48px;
}

.journey__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.entry {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 40px;
  padding: 34px 0;
  border-top: 1px solid var(--line);

  &:last-child {
    border-bottom: 1px solid var(--line);
  }
}

.entry__date {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--accent-ink);
}

.entry__role {
  font-size: 21px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0 0 10px;
  color: var(--ink);
}

.entry__desc {
  margin: 0;
  font-size: 16px;
  line-height: 1.62;
  color: var(--ink-2);
  max-width: 64ch;
}

@media (max-width: 700px) {
  .journey {
    padding: 64px var(--pad-x);
  }

  .entry {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .entry__date {
    font-size: 16px;
  }
}
</style>
