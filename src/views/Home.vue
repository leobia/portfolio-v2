<template>
  <div class="home-container">
    <section id="introduction">
      <div class="section-content">
        <h3>Hi! I'm Leonardo Bianco 👋</h3>
        <h1><span class="slash">/</span> WEB DEVELOPER.</h1>

        <p>
          I'm a web devoleper based in Firenze, Italy specializing in building
          enterprise web applications.
        </p>
        <p>
          Right now I consider myself a
          <span class="border-marker border-marker-vue" @click="openVueSite"
            ><span>Vue</span></span
          >
          enthusiast, you can find most of my open source work on
          <span class="border-marker border-marker-github" @click="openVueSite"
            ><span>Github</span></span
          >
          built with it!
        </p>
      </div>
    </section>
    <section id="work" class="section-repo">
      <div class="section-content has-padding-bottom-9-rem">
        <h1 class="has-text-align-end section-repos-title">
          <span class="slash">/</span> OS WORK.
        </h1>
        <div class="bouncing-loader" v-if="repoLoading">
          <div></div>
        </div>
        <div v-else class="repo-container">
          <article class="card" v-for="(repo, index) in topRepos" :key="index">
            <header class="card-header">
              <h1 class="card-title">
                <div>{{ repo.name }}</div>
              </h1>
              <p class="repo-languages">
                <span v-for="(language, j) in repo.languages" :key="j">{{
                  j === repo.languages.length - 1 ? language : language + ', '
                }}</span>
              </p>
            </header>
            <div class="card-body">
              <div class="card-details">
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
        </div>
      </div>
    </section>
    <section>
      <div class="section-content" id="contact">
        <h1><span class="slash">/</span> CONTACT.</h1>

        <div class="contact-card">
          <div class="form-group field">
            <input
              type="input"
              class="form-field"
              placeholder="Name"
              name="name"
              id="name"
              v-model="name"
              required
            />
            <label for="name" class="form-label">Your Name</label>
          </div>
          <div class="form-group field">
            <input
              type="email"
              class="form-field"
              placeholder="Email"
              name="email"
              id="email"
              v-model="email"
              required
            />
            <label for="name" class="form-label">Your Email</label>
          </div>

          <div class="form-group field">
            <textarea
              class="form-field"
              placeholder="Message"
              name="message"
              id="message"
              v-model="message"
              required
            />
            <label for="name" class="form-label">Your Message</label>
          </div>

          <button
            class="round-button form-button"
            :disabled="sendDisabled"
            @click="sendMessage"
          >
            <i class="icon-paper-plane"></i>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      repoLoading: false,
      repos: null,
      email: '',
      name: '',
      message: ''
    }
  },
  methods: {
    async fetchRepos() {
      this.repoLoading = true
      const response = await fetch(
        'https://api.github.com/users/leobia/repos',
        {
          headers: {
            Accept: 'application/vnd.github.v3+json'
          }
        }
      )
      this.repos = await response.json()

      if (this.repos && this.repos.length) {
        this.repos.sort((a, b) => {
          return new Date(b.updated_at) - new Date(a.updated_at)
        })

        this.repos = this.repos.slice(0, 10)

        for (let i = 0; i < this.repos.length; i++) {
          const repo = this.repos[i]
          const responseLanguages = await fetch(repo.languages_url, {
            headers: { Accept: 'application/vnd.github.v3+json' }
          })
          let languages = await responseLanguages.json()
          repo.languages = Object.keys(languages)
        }
      }
      console.log(this.repos)
      this.repoLoading = false
    },

    async sendMessage() {
      try {
        const response = await axios.post(
          '/.netlify/functions/send-contact-email',
          {
            contactName: this.name,
            contactEmail: this.email,
            message: this.message
          }
        )
        this.message = ''
        this.email = ''
        this.name = ''
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    },
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
    },

    sendDisabled() {
      return (
        this.message.length === 0 ||
        this.email.length === 0 ||
        this.name.length === 0
      )
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
