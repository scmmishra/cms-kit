<script setup lang='ts'>
const isDev = import.meta.dev

const route = useRoute()

const showBlock = computed(() => {
  return isDev && route.query.mode !== 'preview'
})
</script>

<template>
  <div
    v-if="showBlock"
    class="my-2 text-xs bg-white p-2 rounded-md outline outline-gray-200 overflow-hidden"
  >
    <pre><slot /></pre>
  </div>
</template>
