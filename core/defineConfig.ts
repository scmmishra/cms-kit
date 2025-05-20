import type { z } from 'zod/v4'

// We need to infer the return type of defineCollection
type CollectionDefinition<T extends z.ZodRawShape> = {
  title?: string
  description?: string
  fields: T
  layout?: {
    list?: (keyof T)[]
    sidebar?: (keyof T)[]
  }
}

type PageDefinition<T extends z.ZodRawShape = z.ZodRawShape> = {
  title?: string
  description?: string
  fields: T
  layout?: {
    sidebar?: (keyof T)[]
  }
}

export function defineConfig<
  C extends Record<string, CollectionDefinition<z.ZodRawShape>>,
  P extends Record<string, PageDefinition<z.ZodRawShape>>,
>(config: {
  appName?: string
  collections: C
  pages: P
}) {
  return config
}
