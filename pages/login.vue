<script setup lang="ts">
import { useCMSKitConfig } from '~/composables/useCMSKitConfig'

const { appName } = useCMSKitConfig()
const router = useRouter()

definePageMeta({
  layout: 'no-auth',
})

useHead({
  title: 'Login - ' + appName,
})

const state = reactive({
  password: '',
})

const loading = ref(false)
const error = ref('')

async function onSubmit() {
  if (!state.password) {
    error.value = 'Password is required'
    return
  }

  loading.value = true
  error.value = ''

  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        password: state.password,
      },
    })

    // Redirect to dashboard after successful login
    router.push('/')
  }
  catch {
    error.value = 'Login failed'
  }
  finally {
    loading.value = false
  }
}
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
        @submit="onSubmit"
      >
        <UFormField
          label="Password"
          name="password"
          :error="error"
        >
          <UInput
            v-model="state.password"
            class="w-full"
            type="password"
            :disabled="loading"
          />
        </UFormField>

        <UButton
          type="submit"
          block
          :loading="loading"
          :disabled="loading"
        >
          {{ loading ? 'Signing in...' : 'Submit' }}
        </UButton>
      </UForm>
    </UCard>
  </section>
</template>
