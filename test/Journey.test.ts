import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Journey from '~/components/Journey.vue'

const journey = {
  label: 'Journey',
  tagline: '// how I got here',
  entries: [
    { date: '2024', title: 'TODO role', description: 'TODO description.' },
    { date: '2021', title: 'TODO earlier role', description: 'TODO earlier description.' },
  ],
}

describe('Journey', () => {
  it('renders inside a section with the journey anchor', async () => {
    const wrapper = await mountSuspended(Journey, { props: { journey } })
    expect(wrapper.get('section').attributes('id')).toBe('journey')
  })

  it('renders the section label and tagline', async () => {
    const wrapper = await mountSuspended(Journey, { props: { journey } })
    expect(wrapper.text()).toContain('Journey')
    expect(wrapper.text()).toContain('// how I got here')
  })

  it('renders a timeline entry per item in order', async () => {
    const wrapper = await mountSuspended(Journey, { props: { journey } })
    const entries = wrapper.findAll('.journey__entry')
    expect(entries).toHaveLength(2)
    expect(entries[0].get('.journey__title').text()).toBe('TODO role')
    expect(entries[1].get('.journey__title').text()).toBe('TODO earlier role')
  })

  it('renders date, title and description for an entry', async () => {
    const wrapper = await mountSuspended(Journey, { props: { journey } })
    const first = wrapper.get('.journey__entry')
    expect(first.get('.journey__date').text()).toBe('2024')
    expect(first.get('.journey__title').text()).toBe('TODO role')
    expect(first.get('.journey__desc').text()).toBe('TODO description.')
  })
})
