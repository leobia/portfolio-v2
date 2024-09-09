<template>
    <div>
        <div
            class="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
            <div
                class="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg">
            </div>
            <header class="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2"
                aria-label="2024 to Present">{{ period }}</header>
            <div class="z-10 sm:col-span-6">
                <h3 class="font-medium leading-snug text-slate-200">
                    <div>
                        <a class="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300  group/link text-base"
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