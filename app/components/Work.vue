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
  intro?: string
  items: Project[]
}

const props = defineProps<{ work: WorkContent }>()

// Map a stack name to a Simple Icons slug. Unknown names render as a text chip
// (honest, no fake logo). Logos are the credibility texture for proprietary
// work that can't be shown as screenshots.
const ICONS: Record<string, string> = {
  // Note: AWS and Azure logos were removed from Simple Icons (brand licensing),
  // so they intentionally fall through to honest text chips.
  'Spring Boot': 'springboot',
  'Vue.js': 'vuedotjs',
  Angular: 'angular',
  PostgreSQL: 'postgresql',
  'Kubernetes (AKS)': 'kubernetes',
  'Plotly.js': 'plotly',
  Puppeteer: 'puppeteer',
  Docker: 'docker',
}

const iconUrl = (name: string) => {
  const slug = ICONS[name]
  return slug ? `https://cdn.simpleicons.org/${slug}/14110f` : null
}

const featured = computed(() => props.work.items[0])
const rest = computed(() => props.work.items.slice(1))
</script>

<template>
  <section id="work" class="work">
    <div class="work__header">
      <h2 v-reveal class="work__title">{{ work.label }}</h2>
      <p v-if="work.intro" v-reveal="80" class="work__intro">{{ work.intro }}</p>
    </div>

    <!-- Featured project -->
    <article v-if="featured" v-reveal class="feat">
      <div class="feat__text">
        <span class="card__category">{{ featured.category }}</span>
        <h3 class="feat__title">{{ featured.title }}</h3>
        <p class="feat__subtitle">{{ featured.subtitle }}</p>
        <p class="feat__desc">{{ featured.description }}</p>
        <div class="meta">
          <span v-if="featured.company" class="meta__company">{{ featured.company }}</span>
          <span class="meta__role">{{ featured.role }}</span>
          <span class="meta__year">{{ featured.year }}</span>
        </div>
      </div>
      <div class="feat__stack">
        <template v-for="tech in featured.stack" :key="tech">
          <img
            v-if="iconUrl(tech)"
            class="stack__logo"
            :src="iconUrl(tech)!"
            :alt="tech"
            :title="tech"
            loading="lazy"
            width="26"
            height="26"
          />
          <span v-else class="stack__chip">{{ tech }}</span>
        </template>
      </div>
    </article>

    <!-- Remaining projects -->
    <div class="work__grid">
      <article
        v-for="(item, i) in rest"
        :key="item.title"
        v-reveal="i * 80"
        class="card"
      >
        <span class="card__category">{{ item.category }}</span>
        <h3 class="card__title">{{ item.title }}</h3>
        <p class="card__subtitle">{{ item.subtitle }}</p>
        <p class="card__desc">{{ item.description }}</p>
        <div class="card__stack">
          <template v-for="tech in item.stack" :key="tech">
            <img
              v-if="iconUrl(tech)"
              class="stack__logo"
              :src="iconUrl(tech)!"
              :alt="tech"
              :title="tech"
              loading="lazy"
              width="22"
              height="22"
            />
            <span v-else class="stack__chip">{{ tech }}</span>
          </template>
        </div>
        <div class="meta meta--card">
          <span v-if="item.company" class="meta__company">{{ item.company }}</span>
          <span class="meta__role">{{ item.role }}</span>
          <span class="meta__year">{{ item.year }}</span>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped lang="scss">
.work {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 96px var(--pad-x);
  border-top: 1px solid var(--line);
}

.work__header {
  margin-bottom: 48px;
  max-width: 760px;
}

.work__title {
  font-size: clamp(2.2rem, 5vw, 3.6rem);
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 1;
}

.work__intro {
  margin: 18px 0 0;
  font-size: 18px;
  line-height: 1.6;
  color: var(--ink-2);
  max-width: 56ch;
}

.card__category {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--accent-ink);
}

// ── Featured ──
.feat {
  display: grid;
  grid-template-columns: 1.55fr 0.9fr;
  gap: 48px;
  align-items: center;
  background: var(--accent-tint);
  border: 1px solid var(--accent-line);
  border-radius: var(--radius);
  padding: 48px;
  margin-bottom: 22px;
}

.feat__title {
  font-size: clamp(1.9rem, 3.6vw, 2.9rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.02;
  margin: 14px 0 10px;
}

.feat__subtitle {
  margin: 0 0 18px;
  font-size: 16px;
  color: var(--ink-2);
}

.feat__desc {
  margin: 0 0 26px;
  font-size: 16px;
  line-height: 1.62;
  color: var(--ink-2);
  max-width: 60ch;
}

.feat__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  align-items: center;
}

// ── Grid cards ──
.work__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px;
}

.card {
  display: flex;
  flex-direction: column;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 34px;
  transition: border-color 200ms var(--ease), transform 200ms var(--ease);

  &:hover {
    border-color: var(--accent-line);
    transform: translateY(-3px);
  }
}

.card__title {
  font-size: 23px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 14px 0 8px;
}

.card__subtitle {
  margin: 0 0 14px;
  font-size: 14px;
  color: var(--muted);
}

.card__desc {
  margin: 0 0 24px;
  font-size: 15px;
  line-height: 1.58;
  color: var(--ink-2);
}

.card__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
  margin: auto 0 22px;
}

.stack__logo {
  display: block;
  opacity: 0.78;
  transition: opacity 150ms var(--ease);

  .card:hover &,
  .feat:hover & {
    opacity: 1;
  }
}

.stack__chip {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.02em;
  color: var(--muted);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 4px 9px;
}

// ── Meta (no middle-dot pile-up: discrete hairline items) ──
.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;
  padding-top: 18px;
  border-top: 1px solid var(--line);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.02em;
  color: var(--muted);
}

.meta__company {
  color: var(--ink);
}

@media (max-width: 860px) {
  .work {
    padding: 64px var(--pad-x);
  }

  .feat {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 32px;
  }

  .work__grid {
    grid-template-columns: 1fr;
  }
}
</style>
