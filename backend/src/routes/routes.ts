import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { CreateUserController } from '../controllers/users/CreateUserController'

export async function appRoutes(app: FastifyInstance) {
  app.post('/sessions', async (req: FastifyRequest, reply: FastifyReply) => {
    return new CreateUserController().handle(req, reply)
  })
}
