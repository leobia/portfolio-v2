<template>
  <section id="introduction">
    <div class="section-content">
      <h3
        v-motion
        :initial="{
          y: 100,
          opacity: 0
        }"
        :enter="{
          y: 0,
          opacity: 1,
          transition: {
            type: 'spring',
            stiffness: 350,
            damping: 20,
            delay: 50
          }
        }"
      >
        Hi! I'm Leonardo Bianco 👋
      </h3>
      <h1
        v-motion
        :initial="{
          y: 100,
          opacity: 0
        }"
        :enter="{
          y: 0,
          opacity: 1,
          transition: {
            type: 'spring',
            stiffness: 350,
            damping: 20,
            delay: 100
          }
        }"
      >
        <span class="slash">/</span> WEB DEVELOPER.
      </h1>

      <p
        v-motion
        :initial="{
          y: 100,
          opacity: 0
        }"
        :enter="{
          y: 0,
          opacity: 1,
          transition: {
            type: 'spring',
            stiffness: 350,
            damping: 20,
            delay: 150
          }
        }"
      >
        I'm a web devoleper based in Firenze, Italy specializing in building
        enterprise web applications.
      </p>
      <p
        v-motion
        :initial="{
          y: 100,
          opacity: 0
        }"
        :enter="{
          y: 0,
          opacity: 1,
          transition: {
            type: 'spring',
            stiffness: 350,
            damping: 20,
            delay: 200
          }
        }"
      >
        Right now I consider myself a
        <span class="border-marker border-marker-vue" @click="openVueSite"
          ><span>Vue</span></span
        >
        enthusiast, you can find most of my open source work on
        <span
          class="border-marker border-marker-github"
          @click="openRepositories"
          ><span>Github</span></span
        >
        built with it!
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Introduction',

  methods: {
    openVueSite() {
      var yourWindow = window.open()
      yourWindow.opener = null
      yourWindow.location = 'https://vuejs.org/'
    },

    openRepositories() {
      var yourWindow = window.open()
      yourWindow.opener = null
      yourWindow.location = 'https://github.com/leobia?tab=repositories'
    }
  }
}
</script>

<style scoped>
.border-marker {
  cursor: pointer;
  position: relative;
}

.border-marker span {
  z-index: 1;
  position: relative;
}

.border-marker::after {
  content: '';
  position: absolute;
  left: -0.1px;
  right: -0.1px;
  bottom: 0;
  height: 100%;
  transform: scaleY(0.3);
  transition: transform 0.1s ease-in-out;
  transform-origin: bottom;
}

.border-marker-vue::after {
  background-color: hsla(136, 100%, 50%, 0.493);
}

.border-marker-github::after {
  background-color: hsla(207, 100%, 50%, 0.493);
}

.border-marker:hover::after {
  transform: scaleY(1);
}
</style>
