import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Work from '~/components/Work.vue'

const work = {
  label: 'Selected Work',
  tagline: '// systems that ship',
  items: [
    {
      category: 'Realtime / Web',
      title: 'Live Collab Editor',
      subtitle: 'Multiplayer document sync engine.',
      description: 'A CRDT-based editing pipeline.',
      link: '/projects/live-collab',
      role: 'Lead Engineer',
      year: '2025',
      stack: ['Vue', 'WebSocket'],
    },
  ],
}

describe('Work', () => {
  it('renders the section label and tagline', async () => {
    const wrapper = await mountSuspended(Work, { props: { work } })
    expect(wrapper.text()).toContain('Selected Work')
    expect(wrapper.text()).toContain('// systems that ship')
  })

  it('renders a card per project item', async () => {
    const wrapper = await mountSuspended(Work, { props: { work } })
    expect(wrapper.findAll('.card')).toHaveLength(1)
  })

  it('renders category, index, title, subtitle and description on a card', async () => {
    const wrapper = await mountSuspended(Work, { props: { work } })
    const card = wrapper.get('.card')
    expect(card.get('.card__category').text()).toBe('Realtime / Web')
    expect(card.get('.card__index').text()).toBe('01')
    expect(card.get('.card__title').text()).toBe('Live Collab Editor')
    expect(card.get('.card__subtitle').text()).toBe('Multiplayer document sync engine.')
    expect(card.get('.card__desc').text()).toBe('A CRDT-based editing pipeline.')
  })

  it('shows an Explore Project link when the project has a link', async () => {
    const wrapper = await mountSuspended(Work, { props: { work } })
    const footer = wrapper.get('.card__link')
    expect(footer.text()).toContain('Explore Project')
    expect(footer.attributes('href')).toBe('/projects/live-collab')
    expect(wrapper.find('.card__meta').exists()).toBe(false)
  })

  it('shows company·role·year·stack metadata when the project has no link', async () => {
    const noLink = {
      ...work,
      items: [{
        category: 'Infra / DX',
        title: 'Deploy Pilot',
        subtitle: 'Zero-config previews.',
        description: 'A CI orchestrator.',
        company: 'Acme Corp',
        role: 'Backend Engineer',
        year: '2024',
        stack: ['Go', 'Kubernetes'],
      }],
    }
    const wrapper = await mountSuspended(Work, { props: { work: noLink } })
    const meta = wrapper.get('.card__meta')
    expect(meta.text()).toBe('Acme Corp · Backend Engineer · 2024 · Go / Kubernetes')
    expect(wrapper.find('.card__link').exists()).toBe(false)
  })

  it('omits company from metadata when it is absent', async () => {
    const noCompany = {
      ...work,
      items: [{
        category: 'Infra / DX',
        title: 'Deploy Pilot',
        subtitle: 'Zero-config previews.',
        description: 'A CI orchestrator.',
        role: 'Backend Engineer',
        year: '2024',
        stack: ['Go', 'Kubernetes'],
      }],
    }
    const wrapper = await mountSuspended(Work, { props: { work: noCompany } })
    expect(wrapper.get('.card__meta').text()).toBe('Backend Engineer · 2024 · Go / Kubernetes')
  })
})
