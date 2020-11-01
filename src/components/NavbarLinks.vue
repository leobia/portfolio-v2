<template>
  <img src="@/assets/logo.png" style="width: 3em" />
  <router-link class="nav-link" to="/">INTRODUCTION</router-link>
  <router-link class="nav-link" to="/">WORK</router-link>
  <router-link class="nav-link" to="/">CONTACT</router-link>
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
  }
}
</script>
