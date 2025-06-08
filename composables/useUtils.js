export const useUtils = () => {
  const config = useRuntimeConfig()
  const route = useRoute()

  return {
    link: (link) => {
      return link && link.url && link.url.replaceAll(config.public.contentUrl, '')
    },

    page: (page) => {
      return page.replaceAll(config.public.contentUrl, '')
    },

    isActive: (link) => {
      if (!link || !link.url) {
        return false
      }

      const path = link.url.replaceAll(config.public.contentUrl, '')
      const pathSlugs = path.split('/').filter(Boolean)
      const routePath = route.fullPath
      const routeSlugs = routePath.split('/').filter(Boolean)

      return routeSlugs && routeSlugs[0] === pathSlugs[0]
    },

    componentName: (name) => {
      return name
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('')
    },

    platforms: {
      instagram: { name: 'Instagram', icon: 'fa6-brands:instagram' },
      facebook: { name: 'Facebook', icon: 'fa6-brands:facebook' },
      x: { name: 'X', icon: 'fa6-brands:x-twitter' },
      tiktok: { name: 'TikTok', icon: 'fa6-brands:tiktok' },
      email: { name: 'Email', icon: 'ri:mail-line' },
      youtube: { name: 'YouTube', icon: 'fa6-brands:youtube' },
      bluesky: { name: 'Bluesky', icon: 'ri:bluesky-line' },
      linkedin: { name: 'LinkedIn', icon: 'fa6-brands:linkedin' },
    }
  }
}
