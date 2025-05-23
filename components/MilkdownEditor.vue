<script setup lang="ts">
import { Milkdown, useEditor } from '@milkdown/vue'
import { defaultValueCtx, Editor, rootCtx } from '@milkdown/kit/core'
// import { listener, listenerCtx } from '@milkdown/plugin-listener'
import { nord } from '@milkdown/theme-nord'
import { commonmark } from '@milkdown/kit/preset/commonmark'

const modelValue = defineModel<string>('modelValue', {
  default: '',
})

useEditor((root) => {
  return Editor.make()
    .config(nord)
    .config((ctx) => {
      ctx.set(rootCtx, root)
      ctx.set(defaultValueCtx, modelValue.value)
      // const listener = ctx.get(listenerCtx)

      // listener.markdownUpdated((ctx, markdown, prevMarkdown) => {
      //   if (markdown !== prevMarkdown) {
      //     modelValue.value = markdown
      //   }
      // })
    })
    // .use(listener)
    .use(commonmark)
})
</script>

<template>
  <Milkdown />
</template>
