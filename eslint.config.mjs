// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    // v-html is only used to render HTML authored in the WordPress CMS
    'vue/no-v-html': 'off'
  }
})
