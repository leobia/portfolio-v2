<template>
  <article class="card">
    <header class="card-header">
      <h1 class="card-title" v-if="loading">
        <SkeletonBox></SkeletonBox>
      </h1>
      <h1 class="card-title" v-else>
        <div>{{ repo.name }}</div>
      </h1>
      <p class="repo-languages" v-if="loading">
        <SkeletonBox></SkeletonBox>
      </p>
      <p class="repo-languages" v-else>
        <span v-for="(language, j) in repo.languages" :key="j">{{
          j === repo.languages.length - 1 ? language : language + ', '
        }}</span>
      </p>
    </header>
    <div class="card-body">
      <div class="card-details" v-if="loading">
        <SkeletonBox></SkeletonBox>
      </div>
      <div class="card-details" v-else>
        <a
          class="textTransformX card-suptitle"
          :href="repo.html_url"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="icon-chevron-circle-right"></i> View on Github
        </a>
      </div>
    </div>
  </article>
</template>

<script>
import SkeletonBox from '@/components/SkeletonBox'
export default {
  name: 'WorkCard',
  components: { SkeletonBox },
  props: {
    repo: {
      type: Object,
      default: () => {}
    },

    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
