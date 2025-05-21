<script setup lang="ts">
import { usePage, useTitleCase } from '~/composables'

const { pageName, page, state, schema, fieldsWithMeta } = usePage()
</script>

<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <h1 class="font-bold text-black mb-2">
    {{ page.title || pageName }}
  </h1>
  <section class="max-w-xl">
    <UForm
      :state="state"
      :schema="schema"
    >
      <template
        v-for="{ key, meta } in fieldsWithMeta"
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
    </UForm>
  </section>
</template>
