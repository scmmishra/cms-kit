<script setup lang="ts">
import { z } from 'zod/v4'
import { computed } from 'vue'
import type { Component } from 'vue'
import Image from './fields/Image.vue'
import Markdown from './fields/Markdown.vue'
import { USwitch, UTextarea, UInput } from '#components'
import type { GlobalMeta } from '~/cms-kit.config'

import { useTitleCase } from '~/composables'

const props = defineProps<{
  field: z.ZodType
  fieldKey: string
}>()

type FieldConfig = [Component | typeof USwitch | typeof UTextarea | typeof UInput, Record<string, unknown>]

const FIELD_TYPE_MAP: Record<string, FieldConfig> = {
  boolean: [USwitch, {}],
  markdown: [Markdown, { autocomplete: 'off', class: 'w-full' }],
  textarea: [UTextarea, { autocomplete: 'off', class: 'w-full' }],
  code: [UTextarea, { autocomplete: 'off', class: 'w-full' }],
  string: [UInput, { autocomplete: 'off', class: 'w-full' }],
  date: [UInput, { type: 'date', autocomplete: 'off', class: 'w-full' }],
  image: [Image, {}],
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

  return [null, {}]
})
</script>

<template>
  <UFormField
    class="mt-2 pb-2"
    :label="fieldType === 'boolean' ? '' : fieldLabel"
    :name="fieldKey"
    :required="!field.safeParse(undefined).success"
    :help="jsonSchema?.description"
  >
    <component
      :is="componentToRender[0]"
      v-bind="componentToRender[1]"
      v-model="modelValue"
      :label="fieldLabel"
      :accept="jsonSchema?.accept"
      :min-length="jsonSchema.minLength"
      :max-length="jsonSchema.maxLength"
      :placeholder="jsonSchema?.placeholder"
    />
    <DevBlock>
      {{ jsonSchema }}
    </DevBlock>
  </UFormField>
</template>
