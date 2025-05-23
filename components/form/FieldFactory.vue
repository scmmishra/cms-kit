<script setup lang="ts">
import { z } from 'zod/v4'
import { computed } from 'vue'
import { USwitch, UTextarea, UInput } from '#components'
import type { GlobalMeta } from '~/cms-kit.config'

import { useTitleCase } from '~/composables'

const props = defineProps<{
  field: z.ZodType
  fieldKey: string
}>()

const isDev = import.meta.dev
const FIELD_TYPE_MAP: Record<string, [Component, ComponentProps]> = {
  boolean: [USwitch],
  markdown: [UTextarea, { autocomplete: 'off', class: 'w-full' }],
  textarea: [UTextarea, { autocomplete: 'off', class: 'w-full' }],
  code: [UTextarea, { autocomplete: 'off', class: 'w-full' }],
  string: [UInput, { autocomplete: 'off', class: 'w-full' }],
  date: [UInput, { type: 'date', autocomplete: 'off', class: 'w-full' }],
}

type FieldType = z.infer<typeof props.field>
const modelValue = defineModel<FieldType>({ required: true })

const meta = computed(() => {
  return props.field?.meta() as GlobalMeta
})

const jsonSchema = computed(() => {
  return props.field ? z.toJSONSchema(props.field) : {}
})

const fieldType = computed(() => {
  const type = meta.value?.fieldType ?? jsonSchema.value?.type ?? 'string'

  if (type === 'string' && jsonSchema.value?.format === 'date') {
    return 'date'
  }

  return type
})

const fieldLabel = computed(() => {
  return jsonSchema.value?.title || useTitleCase(props.fieldKey ?? '')
})

const componentToRender = computed(() => {
  if (FIELD_TYPE_MAP[fieldType.value]) {
    return FIELD_TYPE_MAP[fieldType.value]
  }

  return ''
})
</script>

<template>
  <UFormField
    class="mt-2 pb-2"
    :label="fieldLabel"
    :name="fieldKey"
    :required="!field.isOptional()"
    :help="jsonSchema?.description"
  >
    <component
      :is="componentToRender[0]"
      v-bind="componentToRender[1]"
      v-model="modelValue"
      :min-length="jsonSchema.minLength"
      :max-length="jsonSchema.maxLength"
      :placeholder="jsonSchema?.placeholder"
    />
    <div
      v-if="isDev"
      class="mt-2 bg-white p-2 rounded-md outline outline-gray-200 overflow-hidden"
    >
      <pre>{{ jsonSchema }}</pre>
    </div>
  </UFormField>
</template>
