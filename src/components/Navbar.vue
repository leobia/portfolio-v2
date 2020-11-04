<template>
  <div class="nav">
    <div class="nav-links">
      <div
        class="nav-burger burger burger-squeeze"
        :class="{ open: menuOpen }"
        @click="toggleMenu"
      >
        <div class="burger-lines"></div>
      </div>
      <NavbarLinks :darkMode="darkMode" @toggle-theme="switchTheme" />
    </div>
    <div class="has-margin-left-auto">
      <div class="main-button">HIRE ME</div>
    </div>
    <Sidebar :menuOpen="menuOpen" @close="menuOpen = false">
      <NavbarLinks :darkMode="darkMode" @toggle-theme="switchTheme" />
    </Sidebar>
  </div>
</template>

<style scoped></style>

<script>
import NavbarLinks from '@/components/NavbarLinks'
import Sidebar from '@/components/Sidebar'

export default {
  name: 'navbar',
  components: { NavbarLinks, Sidebar },
  data() {
    return {
      menuOpen: false,
      darkMode: false
    }
  },

  methods: {
    toggleMenu() {
      if (document.documentElement.classList.contains('preload')) {
        document.documentElement.classList.remove('preload')
      }
      this.menuOpen = !this.menuOpen
    },
    switchTheme() {
      if (document.documentElement.classList.contains('preload')) {
        document.documentElement.classList.remove('preload')
      }
      this.darkMode = !this.darkMode
    }
  },
  mounted() {
    // set 'app-background' class to body
    let bodyElement = document.body
    bodyElement.classList.add('app-background')

    let htmlElement = document.documentElement
    let theme = localStorage.getItem('theme')

    if (theme === 'dark') {
      htmlElement.setAttribute('theme', 'dark')
      this.darkMode = true
    } else {
      htmlElement.setAttribute('theme', 'light')
      this.darkMode = false
    }
  },
  watch: {
    darkMode: function() {
      // add/remove class to/from html tag
      let htmlElement = document.documentElement

      if (this.darkMode) {
        localStorage.setItem('theme', 'dark')
        htmlElement.setAttribute('theme', 'dark')
      } else {
        localStorage.setItem('theme', 'light')
        htmlElement.setAttribute('theme', 'light')
      }
    }
  }
}
</script>
