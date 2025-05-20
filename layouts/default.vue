<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

// const { appName, collections, pages } = useCMSKitConfig()

useHead({
  bodyAttrs: {
    class: 'bg-gray-50',
  },
})

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'Links',
      type: 'label',
    },
    {
      label: 'Collections',
      icon: 'i-lucide-database',
      children: [
        {
          label: 'Introduction',
          description: 'Fully styled and customizable components for Nuxt.',
          icon: 'i-lucide-house',
        },
      ],
    },
    {
      label: 'Pages',
      icon: 'i-lucide-file-text',
      children: [
        {
          label: 'defineShortcuts',
          icon: 'i-lucide-file-text',
          description: 'Define shortcuts for your application.',
          to: '/composables/define-shortcuts',
        },
      ],
    },
  ],
  [
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      badge: '3.8k',
      to: 'https://github.com/nuxt/ui',
      target: '_blank',
    },
    {
      label: 'Help',
      icon: 'i-lucide-circle-help',
      disabled: true,
    },
  ],
])
</script>

<template>
  <div class="flex">
    <aside class="sticky top-0 h-screen basis-48 border-r border-gray-200">
      <UNavigationMenu
        orientation="vertical"
        :items="items"
        class="data-[orientation=vertical]:w-48 h-full [&>*:first-child]:flex-grow [&>*:first-child]:h-full"
      />
    </aside>
    <main class="basis-0 flex-grow-[999] [min-inline-size_50%] min-h-screen py-3">
      <slot />
    </main>
  </div>
</template>
