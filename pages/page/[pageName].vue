<script setup lang="ts">
import { z } from 'zod/v4'
import { usePage } from '~/composables/usePage'

const { pageName, page } = usePage()

const pageSchema = computed(() => page.value?.fields)
</script>

<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <h1 class="font-bold text-black mb-2">
    {{ page.title || pageName }}
  </h1>
  <section>
    <div
      v-for="(field, key) in pageSchema"
      :key="key"
      class="mt-2 border-b pb-2"
    >
      <label>{{ key }}{{ z.toJSONSchema(field) }}</label>
    </div>
  </section>
</template>
