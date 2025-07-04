import tailwindcss from "@tailwindcss/vite"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  runtimeConfig: {
    public: {
      wpApiEndpoint: 'https://content.efaparty.eu/wp-json',
      contentUrl: 'https://content.efaparty.eu',
      baseUrl: 'https://efaparty.eu',
      pushEngage: 'c96400d08fa8308ff3fbcc11225c4705'
    }
  },

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    '@vueuse/nuxt'
  ],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  image: process.env.NUXT_PUBLIC_NODE_ENV === 'production' ? {
    provider: 'netlify',
    domains: ['content.efaparty.eu']
  } : {
    provider: 'ipx'
  }
})