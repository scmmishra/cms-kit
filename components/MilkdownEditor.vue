<script setup lang="ts">
import { Milkdown, useEditor } from '@milkdown/vue'
import { Editor, rootCtx } from '@milkdown/kit/core'
import { listener, listenerCtx } from '@milkdown/plugin-listener'
import { commonmark } from '@milkdown/kit/preset/commonmark'

const modelValue = defineModel<string>('modelValue')

useEditor((root) => {
  return Editor.make()
    .config((ctx) => {
      ctx.set(rootCtx, root)
      const listener = ctx.get(listenerCtx)

      listener.markdownUpdated((ctx, markdown, prevMarkdown) => {
        if (markdown !== prevMarkdown) {
          modelValue.value = markdown
        }
      })
    })
    .use(listener)
    .use(commonmark)
})
</script>

<template>
  <Milkdown />
</template>
