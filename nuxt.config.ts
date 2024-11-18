// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  imports: {
    autoImport: true
  },
  devtools: { enabled: true },
  pages: false,
  modules: ['@primevue/nuxt-module', '@nuxt/fonts', '@nuxt/eslint', '@nuxt/icon'],
  primevue: {
    options: {
      theme: {
        preset: Aura,
      }
    }
  }
})