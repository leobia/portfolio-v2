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
    <div v-reveal class="contact__intro">
      <h2 class="contact__heading">{{ contact.heading }}</h2>
      <p class="contact__body">{{ contact.body }}</p>
      <a class="contact__email" :href="`mailto:${contact.email}`">{{ contact.email }}</a>
      <a class="contact__cv" :href="contact.cv.file" download>
        {{ contact.cv.label }}
        <span aria-hidden="true">&#8595;</span>
      </a>
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
      v-reveal="100"
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

      <label class="field">
        <span class="field__label">{{ contact.form.fields.name }}</span>
        <input type="text" name="name" autocomplete="name" required />
      </label>
      <label class="field">
        <span class="field__label">{{ contact.form.fields.email }}</span>
        <input type="email" name="email" autocomplete="email" required />
      </label>
      <label class="field">
        <span class="field__label">{{ contact.form.fields.message }}</span>
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
  padding: 96px var(--pad-x);
  border-top: 1px solid var(--line);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: start;
}

.contact__heading {
  font-size: clamp(2.4rem, 5vw, 3.8rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 0.98;
  margin: 0 0 20px;
}

.contact__body {
  margin: 0 0 30px;
  font-size: 18px;
  line-height: 1.62;
  color: var(--ink-2);
  max-width: 44ch;
}

.contact__email {
  display: block;
  width: fit-content;
  font-family: var(--font-mono);
  font-size: 15px;
  color: var(--ink);
  text-decoration: none;
  border-bottom: 1px solid var(--accent-line);
  padding-bottom: 2px;
  margin-bottom: 30px;
  transition: color 150ms var(--ease);

  &:hover {
    color: var(--accent-ink);
  }
}

.contact__cv {
  display: flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--on-accent);
  text-decoration: none;
  background: var(--accent);
  border: 1px solid var(--accent);
  border-radius: var(--radius);
  padding: 13px 22px;
  margin-bottom: 32px;
  transition: background 150ms var(--ease), border-color 150ms var(--ease);

  &:hover {
    background: var(--accent-hover);
    border-color: var(--accent-hover);
  }

  &:active {
    transform: translateY(1px);
  }
}

.contact__socials {
  display: flex;
  gap: 22px;
}

.contact__social {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.02em;
  color: var(--muted);
  text-decoration: none;
  transition: color 150ms var(--ease);

  &:hover {
    color: var(--ink);
  }
}

// ── Form ──
.contact__form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: var(--paper-2);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 36px;
}

.contact__hp {
  position: absolute;
  left: -9999px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field__label {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-2); // AA on the paper-2 form panel
}

.field input,
.field textarea {
  font-family: var(--font-body);
  font-size: 15px;
  color: var(--ink);
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 13px 15px;
  transition: border-color 150ms var(--ease), box-shadow 150ms var(--ease);

  &:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-tint);
  }
}

.field textarea {
  resize: vertical;
}

.contact__submit {
  align-self: flex-start;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--paper);
  background: var(--ink);
  border: none;
  border-radius: var(--radius);
  padding: 14px 26px;
  cursor: pointer;
  transition: background 150ms var(--ease), transform 120ms var(--ease);

  &:hover {
    background: var(--accent);
  }

  &:active {
    transform: translateY(1px);
  }
}

@media (max-width: 860px) {
  .contact {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 64px var(--pad-x);
  }
}
</style>
