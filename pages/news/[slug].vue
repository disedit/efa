<script setup>
const { params } = useRoute()
const settings = await useSettings()
const post = await usePost(params.slug)

/* SEO Metatags */
const siteName = settings.seo.site_name
const title = params.slug && params.slug.length > 0 ? `${post.title?.rendered} - ${siteName}` : siteName
const ogTitle = post.acf?.seo?.title || title
const description = post.acf?.seo?.description || settings.seo?.default_description
const ogImage = post.acf?.seo?.og_image?.url || settings.seo?.default_og_image?.url
const keywords = post.acf?.seo?.keywords || settings.seo?.default_keywords
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
  <main class="min-h-safe-viewport">
    <article class="page-container">
      <pre>{{ post }}</pre>
    </article>
  </main>
</template>