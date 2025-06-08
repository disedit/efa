<script setup>
const settings = await useSettings()
const route = useRoute()
const page = route.params.page || 1
const categories = route.query.categories || null
const tags = route.query.tags || null

const { $wp } = useNuxtApp()

const { data: posts } = await useAsyncData(
  `news-${page}-${categories}-${tags}`, () => $wp.news()
    .param('categories', categories)
    .param('tags', tags)
    .param('page', page)
)

/* SEO Metatags */
const siteName = settings.seo.site_name
const title = `News - ${siteName}`
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
  <NewsPage 
    :posts="posts.posts"
    :page="posts.page"
    :per-page="posts.per_page"
    :categories="posts.categories"
    :tags="posts.tags"
  />
</template>
