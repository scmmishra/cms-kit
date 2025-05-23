<script setup lang='ts'>
const isDev = import.meta.dev
</script>

<template>
  <div
    v-if="isDev"
    class="my-2 text-xs bg-white p-2 rounded-md outline outline-gray-200 overflow-hidden"
  >
    <pre><slot /></pre>
  </div>
</template>
