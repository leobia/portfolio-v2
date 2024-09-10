<template>
    <div class="flex items-center rounded-full bg-red-400/10 px-3 py-1 text-xs font-medium leading-5 text-red ">
        {{ text }}</div>
</template>

<script setup>
const props = defineProps({
    text: String
})
</script>