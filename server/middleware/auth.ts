export default defineEventHandler(async (event) => {
  // Skip auth for login page and auth API
  const path = getRequestURL(event).pathname
  if (path === '/login' || path.startsWith('/api/auth') || path.startsWith('/api/_auth')) {
    return
  }

  try {
    // If no user session, redirect to login
    const session = await requireUserSession(event)
    if (!session.user || !('authenticated' in session.user) || !session.user.authenticated) {
      return sendRedirect(event, '/login')
    }
  }
  catch {
    // Redirect to login page if no session
    return sendRedirect(event, '/login')
  }
})
