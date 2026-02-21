import WPAPI from 'wpapi'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const wp = new WPAPI({
    endpoint: config.public.wpApiEndpoint
  })

  wp.page = wp.registerRoute('efa', 'page')
  wp.news = wp.registerRoute('efa', 'news')
  wp.post = wp.registerRoute('efa', 'post')
  wp.events = wp.registerRoute('efa', 'events')
  wp.event = wp.registerRoute('efa', 'event')
  wp.parties = wp.registerRoute('efa', 'member-parties')
  wp.profiles = wp.registerRoute('efa', 'profiles')
  wp.jobs = wp.registerRoute('efa', 'jobs')
  wp.job = wp.registerRoute('efa', 'job')
  wp.settings = wp.registerRoute('efa', 'settings')
  wp.stats = wp.registerRoute('efa', 'stats')
  wp.signatures = wp.registerRoute('efa', 'signatures')

  return {
    provide: {
      wp
    }
  }
})
