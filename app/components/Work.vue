<script setup lang="ts">
interface Project {
  category: string
  title: string
  subtitle: string
  description: string
  link?: string
  company?: string
  role: string
  year: string
  stack: string[]
}

interface WorkContent {
  label: string
  tagline: string
  items: Project[]
}

defineProps<{ work: WorkContent }>()

const index = (i: number) => String(i + 1).padStart(2, '0')

const meta = (p: Project) =>
  [p.company, p.role, p.year, p.stack.join(' / ')].filter(Boolean).join(' · ')
</script>

<template>
  <section id="work" class="work">
    <div class="work__header">
      <span class="work__label">{{ work.label }}</span>
      <span class="work__tagline">{{ work.tagline }}</span>
    </div>

    <div class="work__grid">
      <article v-for="(item, i) in work.items" :key="item.title" class="card">
        <div class="card__top">
          <span class="card__category">{{ item.category }}</span>
          <span class="card__index">{{ index(i) }}</span>
        </div>
        <h3 class="card__title">{{ item.title }}</h3>
        <div class="card__subtitle">{{ item.subtitle }}</div>
        <p class="card__desc">{{ item.description }}</p>
        <a v-if="item.link" class="card__footer card__link" :href="item.link">Explore Project &nbsp;→</a>
        <div v-else class="card__footer card__meta">{{ meta(item) }}</div>
      </article>
    </div>
  </section>
</template>

<style scoped lang="scss">
.work {
  max-width: var(--max-width);
  margin: 0 auto;
}

.work__header {
  border-top: 1px solid var(--border-soft);
  margin: 0 var(--pad-x);
  padding: 28px 0 8px;
  display: flex;
  align-items: baseline;
  gap: 14px;
}

.work__label {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent-text);
}

.work__tagline {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--mono-faint);
}

.work__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px;
  padding: 16px var(--pad-x) 72px;
}

.card {
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-md);
  padding: 30px;
  transition: border-color 150ms ease;

  &:hover {
    border-color: var(--accent-hover-border);
  }
}

.card__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card__category {
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent-text);
}

.card__index {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--index-gray);
}

.card__title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 23px;
  margin: 16px 0 8px;
}

.card__subtitle {
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--mono-muted-2);
  margin-bottom: 14px;
}

.card__desc {
  font-size: 15px;
  line-height: 1.55;
  color: var(--body-2);
  margin: 0 0 24px;
}

.card__footer {
  display: block;
  border-top: 1px solid var(--border-soft-2);
  padding-top: 18px;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.card__link {
  font-weight: 600;
  color: var(--ink);
  text-decoration: none;
}

.card__meta {
  color: var(--mono-muted);
}

@media (max-width: 900px) {
  .work__grid {
    grid-template-columns: 1fr;
  }
}
</style>
