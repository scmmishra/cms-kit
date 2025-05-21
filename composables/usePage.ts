import { z } from 'zod/v4'
import type { PageKey } from '.'
import { useCMSKitConfig } from '.'

export const usePage = () => {
  const config = useCMSKitConfig()
  const route = useRoute()
  const pageName = computed(() => route.params.pageName as PageKey)

  const page = computed(() => {
    return config.pages[pageName.value]
  })

  const schema = computed(() => {
    if (!page.value.fields) return z.object({})
    return z.object(page.value.fields)
  })

  type Schema = z.output<typeof schema.value>

  const state = reactive<Partial<Schema>>({})

  const fieldsWithMeta = computed(() => {
    if (!page.value) return []
    return Object.entries(page.value.fields).map(([key, field]) => {
      return {
        key,
        field,
        meta: field.meta(),
      }
    })
  })

  return {
    schema,
    pageName,
    state,
    fieldsWithMeta,
    page,
  }
}
