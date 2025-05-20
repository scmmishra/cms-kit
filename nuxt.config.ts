import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/icon', '@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  eslint: {
      config: {
        stylistic: true
      }
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
