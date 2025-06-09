import WPAPI from 'wpapi'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const wp = new WPAPI({
    endpoint: config.public.wpApiEndpoint
  })

  wp.news = wp.registerRoute('efa', 'news')
  wp.post = wp.registerRoute('efa', 'post')
  wp.events = wp.registerRoute('wp/v2', 'event')
  wp.parties = wp.registerRoute('efa', 'member-parties')
  wp.profiles = wp.registerRoute('efa', 'profiles')
  wp.campaigns = wp.registerRoute('wp/v2', 'campaign')
  wp.documents = wp.registerRoute('wp/v2', 'document')
  wp.jobs = wp.registerRoute('wp/v2', 'job-posting')
  wp.settings = wp.registerRoute('efa', 'settings')
  wp.stats = wp.registerRoute('efa', 'stats')

  return {
    provide: {
      wp
    }
  }
})
