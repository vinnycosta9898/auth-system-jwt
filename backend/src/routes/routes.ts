import { FastifyInstance } from 'fastify'

export function appRoutes(app: FastifyInstance) {
  app.get('/', () => {
    return { hello: true }
  })
}
