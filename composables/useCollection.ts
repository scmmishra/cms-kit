import { useCMSKitConfig } from './useCMSKitConfig'
import type { CollectionKey } from './useCMSKitConfig'

export const useCollection = () => {
  const config = useCMSKitConfig()
  const route = useRoute()
  const collectionName = computed(() => route.params.collectionName as CollectionKey)

  const collection = computed(() => {
    return config.collections[collectionName.value]
  })

  return {
    collectionName,
    collection,
  }
}
