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

const sidebarFields = computed(() => {
  return page.value.layout?.sidebar || []
})
</script>

<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <UContainer>
    <h1 class="font-bold text-black mb-2">
      {{ page.title || pageName }}
    </h1>
    <UForm
      :state="state"
      :schema="schema"
      class="grid grid-cols-5 gap-8"
    >
      <section class="col-span-3">
        <template
          v-for="(field, key) in mainFields"
          :key="key"
        >
          <FieldFactory
            v-if="!sidebarFields.includes(key)"
            :field-key="key"
            :field="field"
          />
        </template>
      </section>
      <section class="col-span-2">
        <template
          v-for="(field, key) in mainFields"
          :key="key"
        >
          <FieldFactory
            v-if="sidebarFields.includes(key)"
            :field-key="key"
            :field="field"
          />
        </template>
      </section>
    </UForm>
  </UContainer>
</template>
