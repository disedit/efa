export const usePost = async (slug) => {
  const { $wp } = useNuxtApp()

  const { data: post } = await useAsyncData(
    `post-${slug}`,
    () => $wp.posts()
      .slug(slug)
      .param('acf_format', 'standard')
  )

  if (!post.value.length) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Post Not Found'
    })
  }

  return post.value[0]
}
