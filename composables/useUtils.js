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

    isActive: (link, depth = 0) => {
      if (!link || !link.url) {
        return false
      }

      const path = link.url.replaceAll(config.public.contentUrl, '')
      const pathSlugs = path.split('/').filter(Boolean)
      const routePath = route.fullPath
      const routeSlugs = routePath.split('/').filter(Boolean)

      return routeSlugs && routeSlugs[depth] === pathSlugs[depth]
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
      website: { name: 'Website', icon: 'ri:global-line' },
      youtube: { name: 'YouTube', icon: 'fa6-brands:youtube' },
      bluesky: { name: 'Bluesky', icon: 'ri:bluesky-line' },
      linkedin: { name: 'LinkedIn', icon: 'fa6-brands:linkedin' },
    },

    category: (post) => {
      if (!post) return
      
      if (post.tags) {
        return { type: 'tag', ...post.tags[0] }
      } 

      return { type: 'category', ...post.categories[0] }
    },

    subpages: ({ id, menu }) => {
      let currentPage
      menu.forEach((page) => {
        if (page.id === id) {
          currentPage = page
          return
        }
        const pageIndex = page.children.findIndex((p) => p.id === id)
        if (pageIndex !== -1) {
          currentPage = page.children[pageIndex]
        }
      })

      if (currentPage) {
        return currentPage.children
      }

      return menu
    }
  }
}
