import { computed } from 'vue'
import config from '~/cms-kit.config'

export const useCMSKitConfig = () => {
  const { collections, pages } = config

  const collectionsItems = computed(() => {
    return Object.entries(collections).map(([key, collection]) => ({
      label: collection.title,
      description: collection.description,
      to: `/collections/${key}`,
    }))
  })

  const pageItems = computed(() => {
    return Object.entries(pages).map(([key, page]) => ({
      label: page.title,
      description: page.description,
      to: key,
    }))
  })

  return {
    collectionsItems,
    pageItems,
    appName: config.appName || 'CMS Kit',
    ...config,
  }
}
