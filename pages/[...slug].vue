<script setup>
const { params } = useRoute()
const settings = await useSettings()
const page = await usePage(params.slug)

/* SEO Metatags */
const siteName = settings.seo.site_name
const title = params.slug && params.slug.length > 0 ? `${page.title} - ${siteName}` : siteName
const ogTitle = page.fields?.seo?.title || title
const description = page.fields?.seo?.description || settings.seo?.default_description
const ogImage = page.fields?.seo?.og_image?.url || settings.seo?.default_og_image?.url
const keywords = page.fields?.seo?.keywords || settings.seo?.default_keywords
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
  <main class="min-h-page">
    <UtilsBlocks :blocks="page.fields?.blocks" :context="page" />
  </main>
</template>