import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { appRoutes } from './routes/routes'
import { env } from './env'
import { ZodError } from 'zod'

export const app = fastify({
  logger: true,
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(appRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error)
  }

  return reply.status(500).send({ message: 'Internal Server Error' })
})
