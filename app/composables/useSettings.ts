// Shared site settings (ticker, nav, seo). Deduped by the 'settings' key.
export function useSettings() {
  return useAsyncData('settings', () => queryCollection('settings').first())
}
