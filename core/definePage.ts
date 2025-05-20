import type { z } from 'zod/v4'

type FieldKeys<T extends z.ZodRawShape> = keyof T

// Define the page type separately
export type Page<T extends z.ZodRawShape> = {
  title?: string
  description?: string
  fields: T
  layout?: {
    sidebar?: (FieldKeys<T>)[]
  }
}

// Define a helper function to create a strongly typed page definition
export function definePage<T extends z.ZodRawShape>(definition: Page<T>) {
  return definition
}
