import tailwindcss from "@tailwindcss/vite"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  runtimeConfig: {
    public: {
      wpApiEndpoint: 'https://content.efaparty.eu/wp-json',
      baseUrl: 'https://efaparty.eu'
    }
  },

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image'
  ],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})