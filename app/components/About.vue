<script setup lang="ts">
interface AboutContent {
  label: string
  tagline: string
  body: unknown
}

defineProps<{ about: AboutContent }>()
</script>

<template>
  <section id="about" class="about">
    <div class="about__header">
      <span class="about__label">{{ about.label }}</span>
      <span class="about__tagline">{{ about.tagline }}</span>
    </div>

    <ContentRenderer class="about__body" :value="about" />
  </section>
</template>

<style scoped lang="scss">
.about {
  max-width: var(--max-width);
  margin: 0 auto;
}

.about__header {
  border-top: 1px solid var(--border-soft);
  margin: 0 var(--pad-x);
  padding: 28px 0 8px;
  display: flex;
  align-items: baseline;
  gap: 14px;
}

.about__label {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent-text);
}

.about__tagline {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--mono-faint);
}

.about__body {
  padding: 16px var(--pad-x) 72px;
  max-width: 760px;

  :deep(p) {
    font-size: 17px;
    line-height: 1.7;
    color: var(--body);
    margin: 0 0 20px;
  }

  :deep(p:last-child) {
    margin-bottom: 0;
  }

  :deep(strong) {
    color: var(--ink);
    font-weight: 600;
  }

  :deep(a) {
    color: var(--accent-text);
    text-decoration: none;
    border-bottom: 1px solid var(--accent-tint-border);
  }
}
</style>
