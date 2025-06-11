export const useJob = async (slug) => {
  const { $wp } = useNuxtApp()

  const { data: job } = await useAsyncData(
    `job-${slug}`,
    () => $wp.job()
      .param('slug', slug)
  )

  if (!job.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Job Posting Not Found'
    })
  }

  return job.value
}
