<script setup lang="ts">
interface AboutContent {
  heading: string
  kicker?: string
  body: unknown
}

defineProps<{ about: AboutContent }>()
</script>

<template>
  <section id="about" class="about">
    <div v-reveal class="about__aside">
      <span class="about__photo">
        <img src="/profile.png" alt="Leonardo Bianco" width="112" height="112" />
      </span>
      <h2 class="about__heading">{{ about.heading }}</h2>
      <p v-if="about.kicker" class="about__kicker">{{ about.kicker }}</p>
    </div>

    <ContentRenderer v-reveal="100" class="about__body" :value="about" />
  </section>
</template>

<style scoped lang="scss">
.about {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 96px var(--pad-x);
  border-top: 1px solid var(--line);
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 64px;
  align-items: start;
}

.about__aside {
  position: sticky;
  top: 110px;
}

.about__photo {
  display: block;
  width: 112px;
  height: 112px;
  border-radius: var(--radius-round);
  overflow: hidden;
  background: var(--accent); // shows through the cutout, matches the per-load accent
  margin-bottom: 24px;
}

.about__photo img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  // Zoom the cutout so the figure fills the circle instead of floating in it.
  transform: scale(1.18);
  transform-origin: center 12%;
}

.about__heading {
  font-size: clamp(2.4rem, 5.2vw, 4rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 0.96;
}

.about__kicker {
  margin: 18px 0 0;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.02em;
  color: var(--muted);
  max-width: 30ch;
}

.about__body {
  max-width: 62ch;

  :deep(p) {
    font-size: 19px;
    line-height: 1.72;
    color: var(--ink-2);
    margin: 0 0 24px;
  }

  :deep(p:first-child) {
    font-size: 22px;
    line-height: 1.6;
    color: var(--ink);
  }

  :deep(p:last-child) {
    margin-bottom: 0;
  }

  :deep(strong) {
    color: var(--ink);
    font-weight: 600;
  }

  :deep(a) {
    color: var(--accent-ink);
    text-decoration: none;
    border-bottom: 1px solid var(--accent-line);
  }
}

@media (max-width: 860px) {
  .about {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 64px var(--pad-x);
  }

  .about__aside {
    position: static;
  }

  .about__body :deep(p:first-child) {
    font-size: 20px;
  }
}
</style>
