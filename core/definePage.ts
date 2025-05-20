import type { z } from 'zod/v4'

type FieldKeys<T extends z.ZodRawShape> = keyof T

// Define a helper function to create a strongly typed collection definition
export function definePage<T extends z.ZodRawShape>(definition: {
  title?: string
  description?: string
  fields: T
  layout?: {
    sidebar?: (FieldKeys<T>)[]
  }
}) {
  return definition
}
