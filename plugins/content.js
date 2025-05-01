import WPAPI from 'wpapi'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const wp = new WPAPI({
    endpoint: config.public.wpApiEndpoint
  })

  wp.events = wp.registerRoute('wp/v2', 'event')
  wp.parties = wp.registerRoute('wp/v2', 'member-party')
  wp.profiles = wp.registerRoute('wp/v2', 'profile')
  wp.campaigns = wp.registerRoute('wp/v2', 'campaign')
  wp.documents = wp.registerRoute('wp/v2', 'document')
  wp.jobs = wp.registerRoute('wp/v2', 'job-posting')

  return {
    provide: {
      wp
    }
  }
})
