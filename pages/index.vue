<script setup lang="ts">
import CollectionCard from '~/components/dashboard/CollectionCard.vue'
import PageCard from '~/components/dashboard/PageCard.vue'
import { useCMSKitConfig } from '~/composables/useCMSKitConfig'

const { appName, collections, pages } = useCMSKitConfig()

useHead({
  title: 'Login - ' + appName,
})
</script>

<template>
  <UContainer>
    <section class="flex flex-col mb-12">
      <h2 class="text-lg font-bold text-black">
        Collections
      </h2>
      <div class="grid grid-cols-3 gap-4 mt-5">
        <CollectionCard
          v-for="(item, key) in collections"
          :key="key"
          :cms-key="key"
          :title="item.title"
          :description="item.description"
        />
      </div>
    </section>
    <section class="flex flex-col mb-12 ">
      <h2 class="text-lg font-bold text-black">
        Pages
      </h2>
      <div class="grid grid-cols-3 gap-4 mt-5">
        <PageCard
          v-for="(item, key) in pages"
          :key="key"
          :cms-key="key"
          :title="item.title"
          :description="item.description"
        />
      </div>
    </section>
  </UContainer>
</template>
