import { useCMSKitConfig } from './useCMSKitConfig'
import type { PageKey } from './useCMSKitConfig'

export const usePage = () => {
  const config = useCMSKitConfig()
  const route = useRoute()
  const pageName = computed(() => route.params.pageName as PageKey)

  const page = computed(() => {
    return config.pages[pageName.value]
  })

  return {
    pageName,
    page,
  }
}
