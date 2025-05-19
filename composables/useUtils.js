export const useUtils = () => {
  const config = useRuntimeConfig()
  const route = useRoute()

  return {
    link: (link) => {
      return link && link.url && link.url.replaceAll(config.public.contentUrl, '')
    },

    isActive: (link) => {
      if (!link || !link.url) {
        return false
      }

      const path = link.url.replaceAll(config.public.contentUrl, '')
      const pathSlugs = path.split('/').filter(Boolean)
      const routeSlugs = route.params.slug

      return routeSlugs[0] === pathSlugs[0]
    },

    componentName: (name) => {
      return name
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('')
    }
  }
}
