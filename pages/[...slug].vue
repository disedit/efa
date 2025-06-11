<script setup>
const { params } = useRoute()
const settings = await useSettings()
const page = await usePage(params.slug)

/* SEO Metatags */
const siteName = settings.seo.site_name
const title = params.slug && params.slug.length > 0 ? `${page.title?.rendered} - ${siteName}` : siteName
const ogTitle = page.acf?.seo?.title || title
const description = page.acf?.seo?.description || settings.seo?.default_description
const ogImage = page.acf?.seo?.og_image?.url || settings.seo?.default_og_image?.url
const keywords = page.acf?.seo?.keywords || settings.seo?.default_keywords
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
    <UtilsBlocks :blocks="page.acf?.blocks" />
  </main>
</template>