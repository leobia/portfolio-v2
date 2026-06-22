export interface SiteSeo {
  title: string
  description: string
  url: string
  image: string
}

export function buildSeoMeta(seo: SiteSeo) {
  const image = new URL(seo.image, seo.url).href
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
