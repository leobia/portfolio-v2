import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Hero from '~/components/Hero.vue'

const hero = {
  eyebrow: '● Web Developer  //  Firenze',
  headline: { lead: 'Crafting fast, accessible web that', accent: 'ships clean.' },
  body: 'I build robust products end to end.',
  tags: ['Backend & APIs', 'Web Platform', 'DX & Tooling'],
  buttons: {
    primary: { label: 'Explore Projects  ↓', href: '#work' },
    secondary: { label: 'View Journey', href: '#journey' },
  },
}

const now = {
  updated: 'Jun 2026',
  rows: [
    { label: 'Building', value: 'TODO' },
    { label: 'Learning', value: 'TODO' },
    { label: 'Reading', value: 'TODO' },
  ],
  availability: '● Open to select work',
}

describe('Hero', () => {
  it('renders the headline with the final phrase in an accent span', async () => {
    const wrapper = await mountSuspended(Hero, { props: { hero, now } })
    const h1 = wrapper.get('h1')
    expect(h1.text()).toContain('Crafting fast, accessible web that')
    expect(h1.text()).toContain('ships clean.')
    expect(h1.find('span').text()).toBe('ships clean.')
  })

  it('renders the eyebrow pill text', async () => {
    const wrapper = await mountSuspended(Hero, { props: { hero, now } })
    expect(wrapper.text()).toContain('● Web Developer  //  Firenze')
  })

  it('renders the body paragraph', async () => {
    const wrapper = await mountSuspended(Hero, { props: { hero, now } })
    expect(wrapper.get('p').text()).toBe('I build robust products end to end.')
  })

  it('renders a chip per tag', async () => {
    const wrapper = await mountSuspended(Hero, { props: { hero, now } })
    const chips = wrapper.findAll('.hero__chip')
    expect(chips.map(c => c.text())).toEqual(['Backend & APIs', 'Web Platform', 'DX & Tooling'])
  })

  it('renders primary and secondary buttons linking to their hrefs', async () => {
    const wrapper = await mountSuspended(Hero, { props: { hero, now } })
    const primary = wrapper.get('.hero__btn--primary')
    const secondary = wrapper.get('.hero__btn--secondary')
    expect(primary.text()).toContain('Explore Projects')
    expect(primary.attributes('href')).toBe('#work')
    expect(secondary.text()).toContain('View Journey')
    expect(secondary.attributes('href')).toBe('#journey')
  })

  it('renders the Now board header with the updated date', async () => {
    const wrapper = await mountSuspended(Hero, { props: { hero, now } })
    const header = wrapper.get('.board__header')
    expect(header.text()).toContain('Now')
    expect(header.text()).toContain('Updated Jun 2026')
  })

  it('renders a Now board row per item with label and value', async () => {
    const wrapper = await mountSuspended(Hero, { props: { hero, now } })
    const rows = wrapper.findAll('.board__row')
    expect(rows).toHaveLength(3)
    expect(rows[0].get('.board__label').text()).toBe('Building')
    expect(rows[0].get('.board__value').text()).toBe('TODO')
    expect(rows[2].get('.board__label').text()).toBe('Reading')
  })

  it('renders the availability pill', async () => {
    const wrapper = await mountSuspended(Hero, { props: { hero, now } })
    expect(wrapper.get('.board__availability').text()).toBe('● Open to select work')
  })
})
