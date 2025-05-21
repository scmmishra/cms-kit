<script setup lang="ts">
import type { z } from 'zod/v4'

import { useTitleCase } from '~/composables'

const props = defineProps<{
  field: z.ZodType
  fieldKey: string
}>()

const meta = computed(() => {
  return props.field.meta()
})
</script>

<template>
  <UFormField
    class="mt-2 pb-2"
    :label="meta?.title ?? useTitleCase(fieldKey)"
    :name="fieldKey"
    :help="meta?.description"
  >
    <UTextarea
      v-if="['textarea', 'markdown', 'code'].includes(meta?.fieldType as string)"
      autocomplete="off"
      class="w-full"
    />
    <UInput
      v-else
      autocomplete="off"
      class="w-full"
    />
  </UFormField>
</template>
