<script setup lang="ts">
import { z } from 'zod/v4'
import { computed } from 'vue'
import Image from './fields/Image.vue'
import Markdown from './fields/Markdown.vue'
import { USwitch, UTextarea, UInput } from '#components'
import type { GlobalMeta } from '~/cms-kit.config'

import { useTitleCase } from '~/composables'

const props = defineProps<{
  field: z.ZodType
  fieldKey: string
}>()

const FIELD_TYPE_MAP: Record<string, [Component, ComponentProps]> = {
  boolean: [USwitch],
  markdown: [Markdown, { autocomplete: 'off', class: 'w-full' }],
  textarea: [UTextarea, { autocomplete: 'off', class: 'w-full' }],
  code: [UTextarea, { autocomplete: 'off', class: 'w-full' }],
  string: [UInput, { autocomplete: 'off', class: 'w-full' }],
  date: [UInput, { type: 'date', autocomplete: 'off', class: 'w-full' }],
  image: [Image],
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
    :label="fieldType === 'boolean' ? '' : fieldLabel"
    :name="fieldKey"
    :required="!field.isOptional()"
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
    <template
      v-if="fieldType === 'markdown'"
      #hint
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="640"
        class="size-5 inline"
        height="512"
        viewBox="0 0 640 512"
      ><path
        fill="currentColor"
        d="M593.8 59.1H46.2C20.7 59.1 0 79.8 0 105.2v301.5c0 25.5 20.7 46.2 46.2 46.2h547.7c25.5 0 46.2-20.7 46.1-46.1V105.2c0-25.4-20.7-46.1-46.2-46.1M338.5 360.6H277v-120l-61.5 76.9l-61.5-76.9v120H92.3V151.4h61.5l61.5 76.9l61.5-76.9h61.5v209.2zm135.3 3.1L381.5 256H443V151.4h61.5V256H566z"
      /></svg>
    </template>
    <DevBlock>
      {{ jsonSchema }}
    </DevBlock>
  </UFormField>
</template>
