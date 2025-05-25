<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { useCMSKitConfig } from '~/composables/useCMSKitConfig'

const { appName, collections, pages } = useCMSKitConfig()

useHead({
  bodyAttrs: {
    class: 'bg-gray-50',
  },
})

async function logout() {
  try {
    await $fetch('/api/auth/logout', {
      method: 'POST',
    })

    // Redirect to login page after successful logout
    await navigateTo('/login')
  }
  catch (error) {
    console.error('Logout failed:', error)
  }
}

const collectionItems = computed(() => {
  return Object.entries(collections).map(([key, collection]) => ({
    id: key,
    label: collection.title,
    description: collection.description,
    to: `/collection/${key}`,
  }))
})

const pageItems = computed(() => {
  return Object.entries(pages).map(([key, page]) => ({
    id: key,
    label: page.title,
    description: page.description,
    to: `/page/${key}`,
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
      onSelect: logout,
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
