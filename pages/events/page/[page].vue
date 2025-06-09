<script setup>
const settings = await useSettings()
const route = useRoute()
const page = route.params.page || 1

const { $wp } = useNuxtApp()

const { data: events } = await useAsyncData(
  `events-${page}`, () => $wp.events()
    .param('page', page)
)

/* SEO Metatags */
const siteName = settings.seo.site_name
const title = `Events - ${siteName}`
const ogTitle = title
const description = ''
const ogImage = settings.seo?.default_og_image?.url
const keywords = settings.seo?.default_keywords
const twitterSite = settings.seo?.xtwitter_user
useServerSeoMeta({
  title,
  ogTitle,
  description,
  ogDescription: description,
  ogImage,
  twitterCard: 'summary_large_image',
  keywords,
  ogSiteName: siteName,
  twitterSite,
  ogType: 'website'
})
useHead({ title })
</script>

<template>
  <EventsPage 
    :events="events.past"
    :page="events.page"
    :per-page="events.per_page"
  />
</template>
