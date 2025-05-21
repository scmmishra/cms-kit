<script setup lang="ts">
import type { z } from 'zod/v4'
import type { Collection } from '~/core/defineCollection'
import type { CollectionKey } from '~/composables/useCMSKitConfig'

// Using Collection type for reference while accepting only needed fields
type CardProps = {
  cmsKey: CollectionKey
  title: Collection<z.ZodRawShape>['title']
  description: Collection<z.ZodRawShape>['description']
}

defineProps<CardProps>()
</script>

<template>
  <NuxtLink
    :to="`/collection/${cmsKey}`"
    class="outline outline-gray-300 p-4 pt-3 shadow"
  >
    <h3 class="text-lg font-semibold text-black">
      {{ title }}
    </h3>
    <p class="text-sm text-gray-500">
      {{ description }}
    </p>
  </nuxtlink>
</template>
