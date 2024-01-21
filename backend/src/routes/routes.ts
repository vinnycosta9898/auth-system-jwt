import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { CreateUserController } from '../controllers/users/CreateUserController'
import { AuthUserController } from '../controllers/users/AuthUserController'

export async function appRoutes(app: FastifyInstance) {
  app.post('/sessions', async (req: FastifyRequest, reply: FastifyReply) => {
    return new CreateUserController().handle(req, reply)
  })

  app.post('/users', async (req: FastifyRequest, reply: FastifyReply) => {
    return new AuthUserController().handle(req, reply)
  })
}
