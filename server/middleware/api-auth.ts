export default defineEventHandler(async (event) => {
  // Only apply to content API routes that start with GET requests
  const path = getRequestURL(event).pathname
  const method = getMethod(event)

  // Skip for non-content API routes or non-GET methods
  if (!path.startsWith('/api/content') || method !== 'GET') {
    return
  }

  try {
    // Check for session auth first
    const userSession = await getUserSession(event)
    if (
      userSession
      && userSession.user
      && 'authenticated' in userSession.user
      && userSession.user.authenticated
    ) {
      // User is already authenticated via session
      return
    }
  }
  catch {
    // Session check failed, continue to API token check
  }

  // If not authenticated via session, check for API token
  const authHeader = getHeader(event, 'Authorization')
  const apiToken = process.env.CMSKIT_API_TOKEN

  // If no API token is configured, skip token check
  if (!apiToken) {
    return
  }

  // Extract token from Bearer format
  const token = authHeader?.replace('Bearer ', '')

  if (!token || token !== apiToken) {
    throw createError({
      statusCode: 401,
      message: 'Invalid or missing API token',
    })
  }

  // Valid API token, allow access to read-only operations
})
