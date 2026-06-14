import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import About from '~/components/About.vue'

const about = {
  label: 'About',
  tagline: '// who I am',
  body: {
    type: 'minimal',
    value: [
      ['p', {}, 'I build ', ['strong', {}, 'robust'], ' products end to end.'],
    ],
  },
}

describe('About', () => {
  it('renders inside a section with the about anchor', async () => {
    const wrapper = await mountSuspended(About, { props: { about } })
    expect(wrapper.get('section').attributes('id')).toBe('about')
  })

  it('renders the section label and tagline', async () => {
    const wrapper = await mountSuspended(About, { props: { about } })
    expect(wrapper.text()).toContain('About')
    expect(wrapper.text()).toContain('// who I am')
  })

  it('renders the markdown bio as prose, preserving inline formatting', async () => {
    const wrapper = await mountSuspended(About, { props: { about } })
    const prose = wrapper.get('.about__body')
    expect(prose.get('p').text()).toBe('I build robust products end to end.')
    expect(prose.get('strong').text()).toBe('robust')
  })
})
