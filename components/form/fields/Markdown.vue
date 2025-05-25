<script setup lang="ts">
const modelValue = defineModel<string>('modelValue')
</script>

<template>
  <textarea v-model="modelValue" />
</template>
