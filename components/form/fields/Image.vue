<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useDropZone, useObjectUrl, useBase64, useFileDialog } from '@vueuse/core'

const modelValue = defineModel<string | null>()
const selectedFile = ref<File | null>(null)
const dropZoneRef = ref<HTMLDivElement | null>(null)

const props = withDefaults(defineProps<{
  accept?: Array<string>
}>(), {
  accept: () => ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
})

// Use VueUse composables
const previewUrl = useObjectUrl(selectedFile)
const { base64 } = useBase64(selectedFile)

// File dialog setup
const { files, open, reset } = useFileDialog({
  accept: props.accept,
  multiple: false,
})

// Watch file dialog changes
watch(files, (newFiles) => {
  if (newFiles && newFiles.length > 0) {
    selectedFile.value = newFiles[0]
  }
}, { immediate: true })

// Watch base64 changes and update model value
watch(base64, (newBase64) => {
  if (newBase64 && selectedFile.value) {
    modelValue.value = newBase64
  }
}, { immediate: true })

const handleFile = (file: File) => {
  // Check if file is an image
  if (file.type.startsWith('image/')) {
    selectedFile.value = file
  }
}

const onDrop = (files: File[] | null) => {
  if (files && files.length > 0) {
    handleFile(files[0])
  }
}

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  dataTypes: props.accept,
  multiple: false,
})

const openFileDialog = () => {
  open()
}

const clearImage = () => {
  modelValue.value = null
  selectedFile.value = null
  reset()
}

const imageSource = computed(() => previewUrl.value || modelValue.value)

const acceptedFileTypes = computed(() => {
  return props.accept.map((mimeType) => {
    const extension = mimeType.split('/')[1].toUpperCase()
    return extension === 'JPEG' ? 'JPG' : extension
  }).join(', ')
})
</script>

<template>
  <div
    ref="dropZoneRef"
    class="relative block w-full rounded-md text-center cursor-pointer"
    :class="{
      'border-gray-200 hover:border-gray-300': !isOverDropZone,
      'border-primary-500': isOverDropZone,
      'border-2 border-dashed p-4': !imageSource,
      'border border-gray-200': imageSource,
    }"
    @click="openFileDialog"
  >
    <div
      v-if="imageSource"
      class="relative max-h-48 min-h-24 overflow-hidden"
    >
      <img
        :src="imageSource"
        alt="Preview"
        class="mx-auto rounded-md object-contain"
      >
      <button
        class="absolute top-2 right-2 bg-gray-200 rounded-full size-5 grid place-content-center"
        @click.stop="clearImage"
      >
        ✕
      </button>
    </div>
    <div
      v-else
      class="grid place-content-center py-6"
    >
      <p class="text-gray-600">
        Click to upload or drag and drop
      </p>
      <p class="text-xs text-gray-500 mt-1">
        Images only ({{ acceptedFileTypes }})
      </p>
    </div>
  </div>
</template>
