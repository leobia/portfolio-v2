<template>
  <section id="work" class="section-repo">
    <div class="section-content has-padding-bottom-9-rem">
      <h1 class="has-text-align-end section-repos-title" v-motion-from-left>
        <span class="slash">/</span> OPEN SOURCE.
      </h1>
      <div class="repo-container">
        <div
          v-for="(repo, index) in topRepos"
          :key="index"
          v-motion
          :delay="80 * index"
          :initial="{
            opacity: 0,
            y: 160
          }"
          :enter="{
            opacity: 1,
            y: 0
          }"
          :visible="{
            opacity: 1,
            y: 0
          }"
        >
          <WorkCard :repo="repo" :loading="repoLoading"></WorkCard>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import WorkCard from '@/components/WorkCard'
export default {
  name: 'Works',
  components: { WorkCard },
  data() {
    return {
      repoLoading: false,
      repos: [
        { title: '', languages: [], html_url: '' },
        { title: '', languages: [], html_url: '' },
        { title: '', languages: [], html_url: '' },
        { title: '', languages: [], html_url: '' },
        { title: '', languages: [], html_url: '' }
      ]
    }
  },

  computed: {
    topRepos() {
      let topRepos = []

      if (this.repos && this.repos.length > 5) {
        for (let i = 0; i < 5; i++) {
          topRepos.push(this.repos[i])
        }
      } else {
        topRepos = this.repos
      }

      return topRepos
    }
  },

  methods: {
    async fetchRepos() {
      this.repoLoading = true

      setTimeout(async () => {
        const response = await this.$http.get(
          'https://api.github.com/users/leobia/repos'
        )
        this.repos = response.data

        if (this.repos && this.repos.length) {
          this.repos.sort((a, b) => {
            return new Date(b.updated_at) - new Date(a.updated_at)
          })

          this.repos = this.repos.slice(0, 10)

          for (let i = 0; i < this.repos.length; i++) {
            const repo = this.repos[i]

            const responseLanguages = await this.$http.get(repo.languages_url, {
              headers: { Accept: 'application/vnd.github.v3+json' }
            })

            let languages = responseLanguages.data
            repo.languages = Object.keys(languages)
          }
        }
        this.repoLoading = false
      }, 500)
    }
  },

  mounted() {
    this.fetchRepos()
    setTimeout(() => {
      if (document.documentElement.classList.contains('preload')) {
        document.documentElement.classList.remove('preload')
      }
    }, 100)
  }
}
</script>
