<script setup lang="ts">
const { data: hero } = await useAsyncData('hero', () =>
  queryCollection('hero').first(),
)
const { data: now } = await useAsyncData('now', () =>
  queryCollection('now').first(),
)
const { data: work } = await useAsyncData('projects', () =>
  queryCollection('projects').first(),
)
const { data: about } = await useAsyncData('about', () =>
  queryCollection('about').first(),
)
const { data: journey } = await useAsyncData('journey', () =>
  queryCollection('journey').first(),
)
</script>

<template>
  <div id="top">
    <Ticker />
    <Nav />
    <Hero v-if="hero && now" :hero="hero" :now="now" />
    <Work v-if="work" :work="work" />
    <About v-if="about" :about="about" />
    <Journey v-if="journey" :journey="journey" />
  </div>
</template>
