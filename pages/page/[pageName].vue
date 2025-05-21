<script setup lang="ts">
import { z } from 'zod/v4'
import { usePage } from '~/composables/usePage'

const { pageName, page } = usePage()

const toTitleCase = (str: string) => {
  // Handle both snake_case and camelCase
  return str
    // Replace underscores with spaces for snake_case
    .replace(/_/g, ' ')
    // Insert space before capital letters for camelCase
    .replace(/([A-Z])/g, ' $1')
    // Capitalize first letter of each word
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
    .trim()
}

const pageSchema = computed(() => {
  if (!page.value) return []
  return Object.entries(page.value.fields).map(([key, field]) => {
    return {
      key,
      field,
      meta: field.meta(),
    }
  })
})
</script>

<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <h1 class="font-bold text-black mb-2">
    {{ page.title || pageName }}
  </h1>
  <section class="max-w-xl">
    <div
      v-for="{ key, meta } in pageSchema"
      :key="key"
      class="mt-2 pb-2"
    >
      <UFormField
        :label="meta?.title ?? toTitleCase(key)"
        :name="key"
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
    </div>
  </section>
</template>
