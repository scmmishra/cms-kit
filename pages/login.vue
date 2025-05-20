<script setup lang="ts">
const { appName } = useCMSKitConfig()

useHead({
  title: 'Login - ' + appName,
})

const state = reactive({
  email: '',
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
          label="Email"
          name="email"
        >
          <UInput
            v-model="state.email"
            class="w-full"
          />
        </UFormField>

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
