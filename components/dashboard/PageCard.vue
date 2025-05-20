<script setup lang="ts">
import type { z } from 'zod/v4'
import type { PageKey } from '~/composables/useCMSKitConfig'
import type { Page } from '~/core/definePage'

// Using Page type for reference while accepting only needed fields
type CardProps = {
  cmsKey: PageKey
  title: Page<z.ZodRawShape>['title']
  description: Page<z.ZodRawShape>['description']
}

defineProps<CardProps>()
</script>

<template>
  <div
    class="outline outline-gray-300 p-4 pt-3 shadow"
  >
    <h3 class="text-lg font-semibold text-black">
      {{ title }}
    </h3>
    <p v-if="description" class="text-sm text-gray-500">
      {{ description }}
    </p>
  </div>
</template>