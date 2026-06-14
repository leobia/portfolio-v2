export interface SiteSeo {
  title: string
  description: string
  url: string
  image: string
}

function absoluteUrl(base: string, path: string): string {
  if (/^https?:\/\//.test(path)) return path
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}

export function buildSeoMeta(seo: SiteSeo) {
  const image = absoluteUrl(seo.url, seo.image)
  return {
    title: seo.title,
    description: seo.description,
    ogTitle: seo.title,
    ogDescription: seo.description,
    ogImage: image,
    ogUrl: seo.url,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: seo.title,
    twitterDescription: seo.description,
    twitterImage: image,
  }
}
