import { FastifyInstance } from 'fastify'

export async function appRoutes(app: FastifyInstance) {
  app.post('/', async () => {
    return { hello: true }
  })
}
