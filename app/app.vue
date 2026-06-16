<template>
  <!-- Diagonal-fade center grid: fixed, behind all content, non-interactive. -->
  <div class="grid-bg" aria-hidden="true" />
  <NuxtPage />
</template>

<style scoped>
.grid-bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image:
    linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
    linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px);
  background-size: var(--grid-size) var(--grid-size);
  -webkit-mask-image: radial-gradient(ellipse 62% 62% at 50% 42%, #000 28%, transparent 72%);
  mask-image: radial-gradient(ellipse 62% 62% at 50% 42%, #000 28%, transparent 72%);
}
</style>
