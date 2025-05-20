<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { appName, collectionsItems, pageItems } = useCMSKitConfig()

useHead({
  bodyAttrs: {
    class: 'bg-gray-50',
  },
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
      children: collectionsItems.value,
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
    <aside class="sticky top-0 h-screen basis-48 border-r border-gray-200">
      <div class="flex-grow-0 px-2.5 py-2 font-bold">
        {{ appName }}
      </div>
      <UNavigationMenu
        orientation="vertical"
        :items="items"
        class="data-[orientation=vertical]:w-48 pb-3 h-[calc(100vh-40px)] [&>*:second-child]:flex-grow [&>*:second-child]:h-full"
      />
    </aside>
    <main class="basis-0 flex-grow-[999] [min-inline-size_50%] min-h-screen py-3">
      <slot />
    </main>
  </div>
</template>
