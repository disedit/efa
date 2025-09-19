<script setup>
useHead({
  htmlAttrs: { lang: 'en', class: 'bg-white' },
  meta: [
    { name: 'theme-color', content: '#FAF5F2' },
    { name: 'apple-mobile-web-app-title', content: 'EFA' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicons/favicon-96x96.png', sizes: '96x96' },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicons/favicon.svg' },
    { rel: 'shortcut icon', href: '/favicons/favicon.ico' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png' },
    { rel: 'manifest', href: '/favicons/site.webmanifest' }
  ],
  script: [
    { src: 'https://cloud.umami.is/script.js', 'data-website-id': '06b7531d-f38a-4b93-b68a-26243deae410', defer: true }
  ]
})

const config = useRuntimeConfig()

onMounted(() => {
  window.PushEngage = window.PushEngage || []
  window._peq = window._peq || []
  window.PushEngage.push(['init', {
      appId: config.public.pushEngage
  }])

  const e = document.createElement('script')

  e.src = 'https://clientcdn.pushengage.com/sdks/pushengage-web-sdk.js'
  e.async = true
  e.type = 'text/javascript'
  document.head.appendChild(e)
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator :color="false" />
    <SiteNav />
    <slot />
    <SiteFooter />
  </div>
</template>

<style>

</style>