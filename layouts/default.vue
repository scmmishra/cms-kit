<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { useCMSKitConfig } from '~/composables/useCMSKitConfig'

const { appName, collections, pages } = useCMSKitConfig()

useHead({
  bodyAttrs: {
    class: 'bg-gray-50',
  },
})

const collectionItems = computed(() => {
  return Object.entries(collections).map(([key, collection]) => ({
    id: key,
    label: collection.title,
    description: collection.description,
    to: `/collections/${key}`,
  }))
})

const pageItems = computed(() => {
  return Object.entries(pages).map(([key, page]) => ({
    id: key,
    label: page.title,
    description: page.description,
    to: key,
  }))
})

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'Home',
      icon: 'i-lucide-layout-dashboard',
      to: '/',
    },
    {
      defaultOpen: true,
      label: 'Collections',
      icon: 'i-lucide-database',
      children: collectionItems.value,
    },
    {
      defaultOpen: true,
      label: 'Pages',
      icon: 'i-lucide-file-text',
      children: pageItems.value,
    },
  ],
  [
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      badge: 'MIT License',
      to: 'https://github.com/scmmishra/cms-kit',
      target: '_blank',
    },
    {
      label: 'Log out',
      icon: 'i-lucide-log-out',
    },
  ],
])
</script>

<template>
  <div class="flex">
    <aside class="sticky top-0 h-screen py-3 basis-48 border-r border-gray-200">
      <div class="flex-grow-0 px-2.5 mb-2 font-bold text-black">
        {{ appName }}
      </div>
      <UNavigationMenu
        orientation="vertical"
        :items="items"
        class="data-[orientation=vertical]:w-48 pb-3 h-[calc(100vh-40px)] [&>*:first-child]:flex-grow [&>*:first-child]:h-full"
      />
    </aside>
    <main class="basis-0 flex-grow-[999] [min-inline-size_50%] min-h-screen py-3 pl-5">
      <slot />
    </main>
  </div>
</template>
