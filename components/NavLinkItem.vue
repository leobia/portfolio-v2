<template>
  <a class="group flex items-center py-3" :href="href" :class="{ 'active': active }" :rel="rel"
    :target="target"><span class="nav-indicator mr-4 h-px w-8 transition-all group-hover:w-16 group-focus-visible:w-16 motion-reduce:transition-none
            dark:bg-cerulean bg-slate-500
            dark:group-hover:bg-light-blue group-hover:bg-black 
            dark:group-focus-visible:bg-light-blue group-focus-visible:bg-dark"></span><span
      class="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 dark:group-hover:text-light-blue dark:group-focus-visible:text-light-blue group-focus-visible:text-black group-hover:text-black">{{
        title }}</span></a>
</template>

<script setup>
defineProps({
  title: String,
  href: String,
  active: Boolean,
  rel: String,
  download: Boolean,
  target: String
})

</script>

<style lang="css">
@media (prefers-color-scheme: dark) {
  .active .nav-indicator {
    background-color: rgb(226 232 240) !important;
  }

  .active .nav-text {
    color: rgb(226 232 240) !important;
  }
}

.active .nav-indicator {
  width: 4rem;
  background-color: rgb(0, 0, 0);
}

.active .nav-text {
  color: rgb(0, 0, 0);
}
</style>