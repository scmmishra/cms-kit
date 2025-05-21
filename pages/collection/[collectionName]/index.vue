<script setup lang="ts">
import { computed } from 'vue'
import { useCMSKitConfig } from '~/composables'

import type { CollectionKey } from '~/composables'

const config = useCMSKitConfig()
const route = useRoute()
const router = useRouter()
const collectionName = computed(() => route.params.collectionName as CollectionKey)

const collection = computed(() => {
  return config.collections[collectionName.value]
})

// Mock data for now - in a real implementation this would be from the API/database
const items = ref([
  { id: '1', title: 'Item 1', created: '2023-05-20' },
  { id: '2', title: 'Item 2', created: '2023-05-21' },
  { id: '3', title: 'Item 3', created: '2023-05-22' },
])

const createNewItem = () => {
  // Generate a unique ID for the new item - in a real implementation this would be handled by the backend
  const newId = (Math.max(0, ...items.value.map(item => parseInt(item.id))) + 1).toString()
  router.push(`/collection/${collectionName.value}/${newId}`)
}

const columns = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'created',
    header: 'Created',
  },
]
</script>

<template>
  <UContainer>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-black">
        {{ collection?.title || collectionName }}
      </h1>
      <UButton
        icon="i-heroicons-plus"
        @click="createNewItem"
      >
        New Item
      </UButton>
    </div>
    <UTable
      v-if="items.length > 0"
      :data="items"
      :columns="columns"
    />

    <!-- Empty state -->
    <UCard
      v-if="items.length === 0"
      class="p-8 text-center"
    >
      <div class="flex flex-col items-center gap-4">
        <UIcon
          name="i-heroicons-document-text"
          class="text-4xl text-gray-400"
        />
        <div>
          <h3 class="font-medium text-black mb-1">
            No items yet
          </h3>
          <p class="text-gray-500 text-sm">
            Create your first item to get started
          </p>
        </div>
        <UButton
          icon="i-heroicons-plus"
          @click="createNewItem"
        >
          Create Item
        </UButton>
      </div>
    </UCard>
  </UContainer>
</template>
