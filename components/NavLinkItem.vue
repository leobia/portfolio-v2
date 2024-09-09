<template>
    <a class="group flex items-center py-3" :href="href" :class="{'active': active}"><span
            class="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span><span
            class="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">{{
            title }}</span></a>
</template>

<script setup>
defineProps({
    title: String,
    href: String,
    active: Boolean
})

</script>

<style lang="css">
.active .nav-indicator {
    width: 4rem;
  --tw-bg-opacity: 1;
  background-color: rgb(226 232 240/var(--tw-bg-opacity));
}

.active .nav-text {
    --tw-text-opacity: 1;
  color: rgb(226 232 240/var(--tw-text-opacity));
}

</style>