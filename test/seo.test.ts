import { describe, it, expect } from 'vitest'
import { buildSeoMeta } from '~/utils/seo'

const seo = {
  title: 'Leonardo Bianco — Web Developer',
  description: 'Web developer based in Firenze building robust products.',
  url: 'https://leonardobianco.dev',
  image: '/og.png',
}

describe('buildSeoMeta', () => {
  it('mirrors title and description into og and twitter tags', () => {
    const meta = buildSeoMeta(seo)
    expect(meta.title).toBe(seo.title)
    expect(meta.description).toBe(seo.description)
    expect(meta.ogTitle).toBe(seo.title)
    expect(meta.ogDescription).toBe(seo.description)
    expect(meta.twitterTitle).toBe(seo.title)
    expect(meta.twitterDescription).toBe(seo.description)
  })

  it('resolves a relative image into an absolute og/twitter image url', () => {
    const meta = buildSeoMeta(seo)
    expect(meta.ogImage).toBe('https://leonardobianco.dev/og.png')
    expect(meta.twitterImage).toBe('https://leonardobianco.dev/og.png')
  })

  it('leaves an already-absolute image url untouched', () => {
    const meta = buildSeoMeta({ ...seo, image: 'https://cdn.example.com/x.png' })
    expect(meta.ogImage).toBe('https://cdn.example.com/x.png')
  })

  it('joins url and image without doubling slashes', () => {
    const meta = buildSeoMeta({ ...seo, url: 'https://leonardobianco.dev/', image: '/og.png' })
    expect(meta.ogImage).toBe('https://leonardobianco.dev/og.png')
  })

  it('sets canonical-ish og url, website type and large-image twitter card', () => {
    const meta = buildSeoMeta(seo)
    expect(meta.ogUrl).toBe(seo.url)
    expect(meta.ogType).toBe('website')
    expect(meta.twitterCard).toBe('summary_large_image')
  })
})
