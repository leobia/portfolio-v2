<script setup lang="ts">
const { data: settings } = await useAsyncData('settings', () =>
  queryCollection('settings').first(),
)
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
const { data: contact } = await useAsyncData('contact', () =>
  queryCollection('contact').first(),
)

const meta = computed(() => (settings.value?.seo ? buildSeoMeta(settings.value.seo) : {}))
useSeoMeta({
  title: () => meta.value.title,
  description: () => meta.value.description,
  ogTitle: () => meta.value.ogTitle,
  ogDescription: () => meta.value.ogDescription,
  ogImage: () => meta.value.ogImage,
  ogUrl: () => meta.value.ogUrl,
  ogType: () => meta.value.ogType,
  twitterCard: () => meta.value.twitterCard,
  twitterTitle: () => meta.value.twitterTitle,
  twitterDescription: () => meta.value.twitterDescription,
  twitterImage: () => meta.value.twitterImage,
})
</script>

<template>
  <div id="top">
    <Ticker />
    <Nav />
    <Hero v-if="hero && now" :hero="hero" :now="now" />
    <Work v-if="work" :work="work" />
    <About v-if="about" :about="about" />
    <Journey v-if="journey" :journey="journey" />
    <Contact v-if="contact" :contact="contact" />
  </div>
</template>
