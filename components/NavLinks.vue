<template>
    <nav class="nav hidden lg:block">
        <ul class="mt-16 w-max">
            <li>
                <NavLinkItem @click="setActive('about')" title="About" href="#about" :active="isActive('about')" />
            </li>
            <li>
                <NavLinkItem @click="setActive('experience'); console.log(activeId)" title="Experience"
                    href="#experience" :active="isActive('experience')" />
            </li>
            <li>
                <NavLinkItem title="Get Resume" download target="_blank" rel="noreferrer noopener"
                    href="/files/cv_leonardo_bianco_it.pdf" />

            </li>
        </ul>
    </nav>
</template>

<script setup>
import { useActiveScroll } from 'vue-use-active-scroll'

const targets = ref(['about', 'experience'])

const { setActive, isActive, activeId } = useActiveScroll(targets)
</script>