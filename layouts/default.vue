<script setup>
useHead({
  htmlAttrs: { lang: 'en', class: 'bg-white' },
  meta: [
    { name: 'theme-color', content: '#773E90' },
    { name: 'apple-mobile-web-app-title', content: 'EFA' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicons/favicon-96x96.png', sizes: '96x96' },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicons/favicon.svg' },
    { rel: 'shortcut icon', href: '/favicons/favicon.ico' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png' },
    { rel: 'manifest', href: '/favicons/site.webmanifest' }
  ]
})
</script>

<template>
  <div>
    <NuxtLoadingIndicator :color="false" />
    <SiteNav />
    <slot />
    <SiteFooter />
  </div>
</template>

<style>

</style>