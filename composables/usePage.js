export const usePage = async (slug) => {
  const { $wp } = useNuxtApp()

  const { data: pages } = await useAsyncData(
    `page-${slug}`,
    () => $wp.pages()
      .slug(slug || 'home')
      .param('acf_format', 'standard')
  )

  if (!pages.value.length) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page Not Found'
    })
  }

  return pages.value[0]
}
