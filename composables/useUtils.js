export const useUtils = () => {
  const config = useRuntimeConfig()

  return {
    link: (item) => {
      if (item.page) {
        return item.page.replaceAll(config.public.contentUrl, '')
      }

      return item.url || '#'
    }
  }
}
