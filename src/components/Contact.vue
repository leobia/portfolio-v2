<template>
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
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      email: '',
      name: '',
      message: ''
    }
  },

  computed: {
    sendDisabled() {
      return (
        this.message.length === 0 ||
        this.email.length === 0 ||
        this.name.length === 0
      )
    }
  },

  methods: {
    async sendMessage() {
      try {
        const response = await this.$http.post(
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
    }
  }
}
</script>
