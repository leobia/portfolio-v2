<script setup lang="ts">
interface ContactContent {
  label: string
  tagline: string
  heading: string
  body: string
  email: string
  cv: { label: string; file: string }
  socials: { label: string; href: string }[]
  form: {
    name: string
    fields: { name: string; email: string; message: string }
    submit: string
  }
}

defineProps<{ contact: ContactContent }>()
</script>

<template>
  <section id="contact" class="contact">
    <div class="contact__header">
      <span class="contact__label">{{ contact.label }}</span>
      <span class="contact__tagline">{{ contact.tagline }}</span>
    </div>
    <div class="contact__body-wrap">
      <img class="contact__avatar" src="/profile.jpg" alt="Leonardo Bianco" />
      <h2 class="contact__heading">{{ contact.heading }}</h2>
      <p class="contact__body">{{ contact.body }}</p>
      <a class="contact__email" :href="`mailto:${contact.email}`">{{ contact.email }}</a>
      <a class="contact__cv" :href="contact.cv.file" download>{{ contact.cv.label }} &nbsp;↓</a>
      <div class="contact__socials">
        <a
          v-for="social in contact.socials"
          :key="social.href"
          class="contact__social"
          :href="social.href"
          target="_blank"
          rel="noopener noreferrer"
        >{{ social.label }}</a>
      </div>
    </div>

    <form
      class="contact__form"
      :name="contact.form.name"
      method="post"
      data-netlify="true"
      netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" :value="contact.form.name" />
      <p class="contact__hp">
        <label>Don't fill this out: <input name="bot-field" /></label>
      </p>

      <label class="contact__field">
        <span class="contact__field-label">{{ contact.form.fields.name }}</span>
        <input type="text" name="name" required />
      </label>
      <label class="contact__field">
        <span class="contact__field-label">{{ contact.form.fields.email }}</span>
        <input type="email" name="email" required />
      </label>
      <label class="contact__field">
        <span class="contact__field-label">{{ contact.form.fields.message }}</span>
        <textarea name="message" rows="5" required></textarea>
      </label>

      <button class="contact__submit" type="submit">{{ contact.form.submit }}</button>
    </form>
  </section>
</template>

<style scoped lang="scss">
.contact {
  max-width: var(--max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  padding: 16px var(--pad-x) 96px;
  align-items: start;
}

.contact__header {
  grid-column: 1 / -1;
  border-top: 1px solid var(--border-soft);
  padding: 28px 0 8px;
  display: flex;
  align-items: baseline;
  gap: 14px;
}

.contact__label {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent-text);
}

.contact__tagline {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--mono-faint);
}

.contact__avatar {
  display: block;
  width: 88px;
  height: 88px;
  border-radius: var(--radius-round);
  object-fit: cover;
  object-position: center 28%;
  margin-bottom: 20px;
}

.contact__heading {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 34px;
  line-height: 1.15;
  margin: 0 0 16px;
  color: var(--ink);
}

.contact__body {
  font-size: 16px;
  line-height: 1.6;
  color: var(--body);
  margin: 0 0 28px;
  max-width: 42ch;
}

.contact__email {
  display: block;
  width: fit-content;
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--ink);
  text-decoration: none;
  border-bottom: 1px solid var(--accent-tint-border);
  padding-bottom: 2px;
  margin-bottom: 24px;
  transition: color 150ms ease;

  &:hover {
    color: var(--accent-text);
  }
}

.contact__cv {
  display: block;
  width: fit-content;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #fff;
  text-decoration: none;
  background: var(--accent);
  border: 1px solid var(--accent);
  border-radius: var(--radius-sm);
  padding: 14px 22px;
  margin-bottom: 28px;
  transition: background 150ms ease, border-color 150ms ease;

  &:hover {
    background: var(--accent-hover);
    border-color: var(--accent-hover);
  }
}

.contact__socials {
  display: flex;
  gap: 18px;
}

.contact__social {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--mono-muted);
  text-decoration: none;
  transition: color 150ms ease;

  &:hover {
    color: var(--accent-text);
  }
}

.contact__form {
  display: flex;
  flex-direction: column;
  gap: 18px;
  background: var(--card-bg);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-md);
  padding: 30px;
}

.contact__hp {
  position: absolute;
  left: -9999px;
}

.contact__field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.contact__field-label {
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--mono-muted-2);
}

.contact__field input,
.contact__field textarea {
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--ink);
  background: transparent;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-xs);
  padding: 12px 14px;
  transition: border-color 150ms ease;

  &:focus {
    outline: none;
    border-color: var(--accent-hover-border);
  }
}

.contact__field textarea {
  resize: vertical;
}

.contact__submit {
  align-self: flex-start;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #fff;
  background: var(--accent);
  border: none;
  border-radius: var(--radius-sm);
  padding: 14px 22px;
  cursor: pointer;
  transition: background 150ms ease;

  &:hover {
    background: var(--accent-hover);
  }
}

@media (max-width: 900px) {
  .contact {
    grid-template-columns: 1fr;
    gap: 36px;
  }
}
</style>
