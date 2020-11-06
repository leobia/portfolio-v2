<template>
  <div class="">
    <Navbar />
    <router-view />
    <div class="has-text-align-center">
      <a
        class="round-button-footer"
        href="https://www.linkedin.com/in/leonardo-bianco-dev/"
        target="_blank"
      >
        <i class="icon-linkedin"></i>
      </a>
      <a
        class="round-button-footer"
        href="https://github.com/leobia"
        target="_blank"
      >
        <i class="icon-github"></i>
      </a>
    </div>
  </div>
</template>

<style lang="scss"></style>

<script>
import Navbar from '@/components/Navbar'

export default {
  components: {
    Navbar
  }
}
</script>
