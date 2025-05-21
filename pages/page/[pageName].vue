<script setup lang="ts">
import { computed, reactive } from 'vue'
import { z } from 'zod/v4'
import { useCMSKitConfig } from '~/composables'
import FieldFactory from '~/components/form/FieldFactory.vue'

import type { PageKey } from '~/composables'

const config = useCMSKitConfig()
const route = useRoute()
const pageName = computed(() => route.params.pageName as PageKey)

const page = computed(() => {
  return config.pages[pageName.value]
})

const schema = computed(() => {
  if (!page.value.fields) return z.object({})
  return z.object(page.value.fields)
})
type Schema = z.output<typeof schema.value>
const state = reactive<Partial<Schema>>({})

const mainFields = computed(() => {
  return page.value.fields
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
        <FieldFactory
          v-for="(field, key) in mainFields"
          :key="key"
          :field-key="key"
          :field="field"
        />
      </section>
      <section class="col-span-2" />
    </UForm>
  </section>
</template>
