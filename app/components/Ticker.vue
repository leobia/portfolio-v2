<script setup lang="ts">
const { data: settings } = await useAsyncData('settings', () =>
  queryCollection('settings').first(),
)
</script>

<template>
  <div class="ticker">
    <span v-for="(item, i) in settings?.ticker" :key="i" class="ticker__item">{{ item }}</span>
  </div>
</template>

<style scoped lang="scss">
.ticker {
  background: var(--accent);
  color: #fff;
  padding: 9px var(--pad-x);
  display: flex;
  gap: 30px;
  overflow: hidden;
  white-space: nowrap;
}

.ticker__item {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
</style>
