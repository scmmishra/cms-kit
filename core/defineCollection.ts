import type { z } from 'zod/v4'

type FieldKeys<T extends z.ZodRawShape> = keyof T

// Define the collection type separately
export type Collection<T extends z.ZodRawShape> = {
  title?: string
  description?: string
  fields: T
  layout?: {
    list?: (FieldKeys<T>)[]
    sidebar?: (FieldKeys<T>)[]
  }
}

// Define a helper function to create a strongly typed collection definition
export function defineCollection<T extends z.ZodRawShape>(definition: Collection<T>) {
  return definition
}
