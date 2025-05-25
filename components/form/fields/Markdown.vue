<script setup lang="ts">
import { MilkdownProvider } from '@milkdown/vue'
import MilkdownEditor from '../../MilkdownEditor.vue'

const modelValue = defineModel<string>('modelValue')
</script>

<template>
  <MilkdownProvider class="prose dark:prose-invert prose-xs max-w-none w-full">
    <MilkdownEditor v-model="modelValue" />
  </MilkdownProvider>
</template>

<style>
@reference "@/assets/css/main.css";

.ProseMirror.editor {
  min-height: 20rem;
  max-height: 30rem;
  overflow: scroll;
  @apply w-full max-w-none w-full rounded-md border-0 placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 transition-colors px-2.5 py-1.5 text-sm gap-1.5 text-highlighted bg-default ring ring-inset ring-accented focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary;
}
</style>
