<template>
  <div class="home-container">
    <Introduction />

    <Works />

    <Contact />
  </div>
</template>

<script>
import Introduction from '@/components/Introduction.vue'
import Works from '@/components/Works.vue'
import Contact from '@/components/Contact.vue'

export default {
  name: 'Home',
  components: { Introduction, Works, Contact }
}
</script>
