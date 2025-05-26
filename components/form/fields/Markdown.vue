<script setup lang="ts">
import { watch, computed } from 'vue'
import { marked } from 'marked'
import { useToggle } from '@vueuse/core'

const { $sanitizeHTML } = useNuxtApp()

const modelValue = defineModel<string>('modelValue')
const [showPreview, togglePreview] = useToggle(false)
const textareaRef = ref<HTMLTextAreaElement>()

const autoResize = () => {
  if (textareaRef.value) {
    textareaRef.value.style.height = 'auto'
    textareaRef.value.style.height = textareaRef.value.scrollHeight + 'px'
  }
}

const renderedMarkdown = computed(() => {
  return marked(modelValue.value || '')
})

watch(modelValue, () => nextTick(autoResize), { immediate: true })
</script>

<template>
  <div class="w-full min-h-32 flex flex-col justify-between rounded-md border-0 placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 transition-colors text-sm gap-1.5 text-highlighted bg-default ring ring-inset ring-accented focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary resize-none overflow-hidden">
    <textarea
      v-show="!showPreview"
      ref="textareaRef"
      v-model="modelValue"
      class="h-full w-full focus:outline-none px-2.5 py-1.5 resize-none"
      rows="4"
      @input="autoResize"
    />
    <div
      v-show="showPreview"
      class="px-2.5 py-1.5 prose prose-sm prose-h1:mt-2 prose-h2:mt-2 max-w-none"
      :style="{ minHeight: textareaRef?.style.height }"
    >
      <div v-html="renderedMarkdown" />
    </div>
    <div class="border-t flex items-center justify-between border-gray-300 w-full py-1 px-2 font-mono text-xs text-gray-500">
      <div class="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="640"
          class="size-5 inline"
          height="512"
          viewBox="0 0 640 512"
        ><path
          fill="currentColor"
          d="M593.8 59.1H46.2C20.7 59.1 0 79.8 0 105.2v301.5c0 25.5 20.7 46.2 46.2 46.2h547.7c25.5 0 46.2-20.7 46.1-46.1V105.2c0-25.4-20.7-46.1-46.2-46.1M338.5 360.6H277v-120l-61.5 76.9l-61.5-76.9v120H92.3V151.4h61.5l61.5 76.9l61.5-76.9h61.5v209.2zm135.3 3.1L381.5 256H443V151.4h61.5V256H566z"
        /></svg>
        Supports markdown
      </div>
      <div>
        <button
          type="button"
          class="px-2 py-1 hover:bg-gray-200 bg-gray-100 rounded"
          @click="() => togglePreview()"
        >
          Toggle Preview
        </button>
      </div>
    </div>
  </div>
</template>
