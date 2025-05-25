import { defineEventHandler, readBody, createError } from 'h3'

interface LoginPayload {
  password: string
}

export default defineEventHandler(async (event) => {
  const configPassword = process.env.CMSKIT_PASSWORD

  if (!configPassword) {
    throw createError({
      statusCode: 500,
      message: 'Authentication not configured',
    })
  }

  const { password } = await readBody<LoginPayload>(event)

  if (!password) {
    throw createError({
      statusCode: 400,
      message: 'Password is required',
    })
  }

  if (password !== configPassword) {
    throw createError({
      statusCode: 401,
      message: 'Invalid password',
    })
  }

  await setUserSession(event, {
    user: {
      role: 'admin',
      authenticated: true,
    },
    loggedInAt: new Date(),
  })

  return { success: true }
})
