<template>
  <div class="container">
    <Navbar />
    <router-view />
  </div>
</template>

<style lang="scss"></style>

<script>
import Navbar from '@/components/Navbar'

export default {
  components: {
    Navbar
  },
  data() {
    return {
      darkMode: false
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
