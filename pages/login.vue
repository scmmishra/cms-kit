<script setup lang="ts">
import { useCMSKitConfig } from '~/composables/useCMSKitConfig'

const { appName } = useCMSKitConfig()

definePageMeta({
  layout: 'no-auth',
})

useHead({
  title: 'Login - ' + appName,
})

const state = reactive({
  password: '',
})
</script>

<template>
  <section class="pt-20">
    <UCard class="max-w-md mx-auto shadow-lg">
      <h1 class="text-2xl font-bold font-mono">
        Login to {{ appName }}
      </h1>
      <UForm
        :state
        class="mt-5 space-y-4"
      >
        <UFormField
          label="Password"
          name="password"
        >
          <UInput
            v-model="state.password"
            class="w-full"
            type="password"
          />
        </UFormField>

        <UButton
          type="submit"
          block
        >
          Submit
        </UButton>
      </UForm>
    </UCard>
  </section>
</template>
