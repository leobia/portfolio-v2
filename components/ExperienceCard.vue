<template>
    <div>
        <div
            class="group relative grid py-2 px-2 rounded transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 hover:bg-slate-300/50 dark:hover:bg-slate-800/50">
            <header class="mb-2 mt-1 text-xs font-semibold uppercase tracking-wide dark:text-slate-500 sm:col-span-2"
                :aria-label="period">{{ period }}</header>
            <div class="sm:col-span-6">
                <h3 class="font-medium dark:text-light-blue text-dark">
                    <div>
                        <a class="inline-flex items-baseline font-medium leading-tight dark:text-light-blue text-dark hover:text-red focus-visible:text-red group/link text-base"
                            :href="link" target="_blank" rel="noreferrer noopener"
                            :aria-label="title + ' (opens in a new tab)'">
                            {{ title }}
                        </a>
                    </div>
                </h3>
                <p class="mt-2 text-sm leading-normal">{{ description }}</p>
                <ul class="mt-2 flex flex-wrap" aria-label="Technologies used">
                    <li v-for="technology in technologies" class="mr-1.5 mt-2">
                        <Tag :text="technology"></Tag>
                    </li>
                </ul>
            </div>
        </div>
    </div>

</template>

<script setup>
const props = defineProps({
    period: String,
    technologies: Array,
    title: String,
    link: String,
    description: String,
})
</script>