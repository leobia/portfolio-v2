<template>
  <div class="nav">
    <div class="nav-links">
      <a class="nav-burger">
        <span class="icon-menu"></span>
      </a>
      <img src="@/assets/logo.png" style="width: 3em" />
      <router-link class="nav-link" to="/">INTRODUCTION</router-link>
      <router-link class="nav-link" to="/">WORK</router-link>
      <router-link class="nav-link" to="/">CONTACT</router-link>
      <input
        type="checkbox"
        class="theme-switch"
        v-model="darkMode"
        @change="checkPreloadClass"
      />
    </div>
    <div>
      <div class="main-button">HIRE ME</div>
    </div>
  </div>
</template>

<style scoped></style>

<script>
export default {
  name: 'navbar',
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
  },
  methods: {
    checkPreloadClass() {
      if (document.documentElement.classList.contains('preload')) {
        document.documentElement.classList.remove('preload')
      }
    }
  }
}
</script>
