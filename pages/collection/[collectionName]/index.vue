<script setup lang="ts">
import { useCollection } from '~/composables/useCollection'

const { collectionName, collection } = useCollection()

const collectionSchema = computed(() => collection.value?.fields)
</script>

<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <h1 class="font-bold text-black mb-2">
    {{ collection.title || collectionName }}
  </h1>
  <section>
    <div
      v-for="(field, key) in collectionSchema"
      :key="key"
    >
      <label>{{ field }}</label>
    </div>
  </section>
</template>
