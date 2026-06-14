import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Contact from '~/components/Contact.vue'

const contact = {
  label: 'Contact',
  tagline: '// let\'s build something',
  heading: 'Have a project in mind?',
  body: 'Backend, web, or infra — drop a line and I\'ll get back to you.',
  email: 'leo.nostress96@gmail.com',
  cv: { label: 'Download CV', file: '/files/cv_leonardo_bianco.pdf' },
  socials: [
    { label: 'GitHub', href: 'https://github.com/leobia' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/leobia' },
  ],
  form: {
    name: 'contact',
    fields: { name: 'Name', email: 'Email', message: 'Message' },
    submit: 'Send Message',
  },
}

describe('Contact', () => {
  it('renders the section label, tagline and heading', async () => {
    const wrapper = await mountSuspended(Contact, { props: { contact } })
    expect(wrapper.text()).toContain('Contact')
    expect(wrapper.text()).toContain('// let\'s build something')
    expect(wrapper.text()).toContain('Have a project in mind?')
  })

  it('renders the intro body', async () => {
    const wrapper = await mountSuspended(Contact, { props: { contact } })
    expect(wrapper.text()).toContain('drop a line')
  })

  it('renders a link per social, with label and href', async () => {
    const wrapper = await mountSuspended(Contact, { props: { contact } })
    const links = wrapper.findAll('.contact__social')
    expect(links).toHaveLength(2)
    expect(links[0].text()).toBe('GitHub')
    expect(links[0].attributes('href')).toBe('https://github.com/leobia')
    expect(links[1].attributes('href')).toBe('https://linkedin.com/in/leobia')
  })

  it('renders an email link', async () => {
    const wrapper = await mountSuspended(Contact, { props: { contact } })
    const email = wrapper.get('.contact__email')
    expect(email.text()).toContain('leo.nostress96@gmail.com')
    expect(email.attributes('href')).toBe('mailto:leo.nostress96@gmail.com')
  })

  it('renders a CV download button linking to the static file', async () => {
    const wrapper = await mountSuspended(Contact, { props: { contact } })
    const cv = wrapper.get('.contact__cv')
    expect(cv.text()).toContain('Download CV')
    expect(cv.attributes('href')).toBe('/files/cv_leonardo_bianco.pdf')
    expect(cv.attributes('download')).toBeDefined()
  })

  it('renders a valid Netlify form with POST, name and honeypot', async () => {
    const wrapper = await mountSuspended(Contact, { props: { contact } })
    const form = wrapper.get('form.contact__form')
    expect(form.attributes('name')).toBe('contact')
    expect(form.attributes('method')).toBe('post')
    expect(form.attributes('data-netlify')).toBe('true')
    expect(form.attributes('netlify-honeypot')).toBe('bot-field')
    // hidden form-name input so Netlify routes the submission
    const formName = form.get('input[name="form-name"]')
    expect(formName.attributes('type')).toBe('hidden')
    expect((formName.element as HTMLInputElement).value).toBe('contact')
    // honeypot field
    expect(form.find('input[name="bot-field"]').exists()).toBe(true)
  })

  it('renders name, email and message fields with labels', async () => {
    const wrapper = await mountSuspended(Contact, { props: { contact } })
    const form = wrapper.get('form.contact__form')
    expect(form.get('input[name="name"]').attributes('type')).toBe('text')
    expect(form.get('input[name="email"]').attributes('type')).toBe('email')
    expect(form.find('textarea[name="message"]').exists()).toBe(true)
    expect(form.text()).toContain('Name')
    expect(form.text()).toContain('Email')
    expect(form.text()).toContain('Message')
    expect(form.text()).toContain('Send Message')
  })
})
