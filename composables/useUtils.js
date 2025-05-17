export const useUtils = () => {
  const config = useRuntimeConfig()
  const route = useRoute()

  return {
    link: (item) => {
      if (item.page) {
        return item.page.replaceAll(config.public.contentUrl, '')
      }

      return item.url || '#'
    },

    isActive: (item) => {
      if (!item.page) {
        return false
      }

      const path = item.page.replaceAll(config.public.contentUrl, '')
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
