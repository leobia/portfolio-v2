<template>
  <img
    src="@/assets/logo.png"
    width="38"
    height="38"
    alt="Logo Leonardo Bianco portfolio"
  />
  <a class="nav-link" @click="scrollTo('#introduction')">INTRODUCTION</a>
  <a class="nav-link" @click="scrollTo('#work')">WORK</a>
  <a class="nav-link" @click="scrollTo('#contact')">CONTACT</a>
  <div
    class="theme-switch"
    :class="{ 'toggle-btn--dark': darkMode }"
    @click="$emit('toggle-theme')"
  ></div>
</template>
<script>
export default {
  name: 'NavbarLinks',
  props: {
    darkMode: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    scrollTo(id) {
      document.querySelector(id).scrollIntoView({
        behavior: 'smooth'
      })
    }
  },

  emits: ['toggle-theme']
}
</script>
