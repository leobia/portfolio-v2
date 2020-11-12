<template>
  <div class="">
    <Navbar />
    <router-view />
    <div class="has-text-align-center">
      <a
        class="round-button-footer"
        aria-label="Open Linkedin Page"
        target="_blank"
        href="https://www.linkedin.com/in/leonardo-bianco-dev/"
        rel="noopener noreferrer"
      >
        <i class="icon-linkedin"></i>
      </a>
      <a
        class="round-button-footer"
        aria-label="Open Github Page"
        target="_blank"
        href="https://github.com/leobia"
        rel="noopener noreferrer"
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
