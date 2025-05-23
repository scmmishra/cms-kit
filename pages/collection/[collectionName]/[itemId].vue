<script setup lang="ts">
import { computed, reactive } from 'vue'
import { z } from 'zod/v4'
import { useCMSKitConfig } from '~/composables'
import FieldFactory from '~/components/form/FieldFactory.vue'

import type { CollectionKey } from '~/composables'

const config = useCMSKitConfig()
const route = useRoute()
const collectionName = computed(() => route.params.collectionName as CollectionKey)
const itemId = computed(() => route.params.itemId as string)

const collection = computed(() => {
  return config.collections[collectionName.value]
})

const schema = computed(() => {
  if (!collection.value.fields) return z.object({})
  return z.object(collection.value.fields)
})

type Schema = z.output<typeof schema.value>
const state = reactive<Partial<Schema>>({})

const mainFields = computed(() => {
  return collection.value.fields
})

const sidebarFields = computed(() => {
  return collection.value.layout?.sidebar || []
})
</script>

<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <UContainer>
    <h1 class="font-bold text-black mb-2">
      {{ collection.title || collectionName }} - {{ itemId }}
    </h1>
    <DevBlock>
      {{ state }}
    </DevBlock>
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
            v-model="state[key]"
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
            v-model="state[key]"
            :field-key="key"
            :field="field"
          />
        </template>
      </section>
    </UForm>
  </UContainer>
</template>
