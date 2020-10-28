<template>
  <div class="nav">
    <img src="@/assets/logo.png" style="width: 3em" />
    <router-link to="/">Home</router-link> |
    <input type="checkbox" class="theme-switch" v-model="darkMode" />
  </div>
</template>

<style scoped></style>

<script>
export default {
  name: 'navbar'
}
</script>
