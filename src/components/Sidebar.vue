<template>
  <div class="sidebar">
    <div
      class="sidebar-backdrop"
      @click="$emit('close')"
      v-show="menuOpen"
    ></div>
    <transition name="slide">
      <div v-show="menuOpen" class="sidebar-panel">
        <div class="sidebar-link-container">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    menuOpen: {
      type: Boolean,
      default: false
    }
  }
}
</script>
