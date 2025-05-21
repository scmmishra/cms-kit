<script setup lang="ts">
import type { z } from 'zod/v4'
import { usePage, useTitleCase } from '~/composables'

type FieldKeys<T extends z.ZodRawShape> = keyof T

const { pageName, page, state, schema } = usePage()

const fieldsWithMeta = computed(() => {
  if (!page.value) return []
  return Object.entries(page.value.fields).map(([key, field]) => {
    return {
      key: key as FieldKeys<typeof page.value.fields>,
      field,
      meta: field.meta(),
    }
  })
})

const mainFields = computed(() => {
  if (page.value.layout?.sidebar) {
    const sidebarFields = page.value.layout?.sidebar ?? []
    return fieldsWithMeta.value.filter((field) => {
      return !sidebarFields.includes(field.key)
    })
  }

  return fieldsWithMeta.value
})

const sidebarFields = computed(() => {
  if (page.value.layout?.sidebar) {
    const sidebarFields = page.value.layout?.sidebar ?? []
    return fieldsWithMeta.value.filter((field) => {
      return sidebarFields.includes(field.key)
    })
  }

  return []
})
</script>

<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <h1 class="max-w-5xl mx-auto font-bold text-black mb-2">
    {{ page.title || pageName }}
  </h1>
  <section class="max-w-5xl mx-auto">
    <UForm
      :state="state"
      :schema="schema"
      class="grid grid-cols-5 gap-8"
    >
      <section class="col-span-3">
        <template
          v-for="{ key, meta } in mainFields"
          :key="key"
        >
          <UFormField
            class="mt-2 pb-2"
            :label="meta?.title ?? useTitleCase(key)"
            :name="key"
            :help="meta?.description"
          >
            <UTextarea
              v-if="['textarea', 'markdown', 'code'].includes(meta?.fieldType as string)"
              v-model="state[key]"
              autocomplete="off"
              class="w-full"
            />
            <UInput
              v-else
              v-model="state[key]"
              autocomplete="off"
              class="w-full"
            />
          </UFormField>
        </template>
      </section>
      <section class="col-span-2">
        <template
          v-for="{ key, meta } in sidebarFields"
          :key="key"
        >
          <UFormField
            class="mt-2 pb-2"
            :label="meta?.title ?? useTitleCase(key)"
            :name="key"
            :help="meta?.description"
          >
            <UTextarea
              v-if="['textarea', 'markdown', 'code'].includes(meta?.fieldType as string)"
              v-model="state[key]"
              autocomplete="off"
              class="w-full"
            />
            <UInput
              v-else
              v-model="state[key]"
              autocomplete="off"
              class="w-full"
            />
          </UFormField>
        </template>
      </section>
    </UForm>
  </section>
</template>
