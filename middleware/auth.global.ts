export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession()

  // Allow access to login page
  if (to.path === '/login') {
    return
  }

  // Redirect to login if not authenticated
  if (!loggedIn.value) {
    return navigateTo('/login')
  }
})