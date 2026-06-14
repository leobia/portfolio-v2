<script setup lang="ts">
const { data: hero } = await useAsyncData('hero', () =>
  queryCollection('hero').first(),
)
const { data: now } = await useAsyncData('now', () =>
  queryCollection('now').first(),
)
</script>

<template>
  <div id="top">
    <Ticker />
    <Nav />
    <Hero v-if="hero && now" :hero="hero" :now="now" />
  </div>
</template>
