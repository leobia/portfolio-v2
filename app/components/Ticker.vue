<script setup lang="ts">
const { data: settings } = await useSettings()

// Duplicate the run so the marquee loops seamlessly.
const items = computed(() => settings.value?.ticker ?? [])
</script>

<template>
  <div class="ticker" aria-hidden="true">
    <div class="ticker__track">
      <template v-for="rep in 2" :key="rep">
        <span v-for="(item, i) in items" :key="rep + '-' + i" class="ticker__item">
          {{ item }}
          <span class="ticker__sep">/</span>
        </span>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ticker {
  background: var(--accent);
  color: var(--on-accent);
  overflow: hidden;
  white-space: nowrap;
  border-bottom: 1px solid var(--ink);
}

.ticker__track {
  display: inline-flex;
  align-items: center;
  padding: 10px 0;
  animation: ticker-scroll 38s linear infinite;
}

.ticker__item {
  display: inline-flex;
  align-items: center;
  gap: 22px;
  padding: 0 22px;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.ticker__sep {
  opacity: 0.55;
}

@keyframes ticker-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ticker__track {
    animation: none;
  }
}
</style>
