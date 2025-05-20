<script setup lang="ts">
useHead({
  title: "Login - CMSKit"
})
</script>

<template>
 <section class="pt-20 font-mono">
  <div class="max-w-md mx-auto p-6 bg-white shadow outline-1 outline-gray-300">
    <h1 class="text-2xl font-bold">Login</h1>
    <UForm>
      <label for="email">Email</label>
      <input id="email" type="email" name="email" required>
      <label for="password">Password</label>
      <input id="password" type="password" name="password" required>
      <button type="submit">Login</button>
    </UForm>
  </div>
 </section>
</template>
