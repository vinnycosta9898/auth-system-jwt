import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { CreateUserController } from '../controllers/users/CreateUserController'
import { AuthUserController } from '../controllers/users/AuthUserController'
import { DetailUserController } from '../controllers/users/DetailUserController'
import { verifyJWT } from '../middlewares/verify-jwt'
// import { verifyErrors } from '../middlewares/verify-errors'

export async function appRoutes(app: FastifyInstance) {
  app.post(
    '/sessions',
    // { preHandler: verifyErrors },
    async (req: FastifyRequest, reply: FastifyReply) => {
      return new CreateUserController().handle(req, reply)
    },
  )

  app.post('/users', async (req: FastifyRequest, reply: FastifyReply) => {
    return new AuthUserController().handle(req, reply)
  })

  app.get(
    '/me',
    { onRequest: [verifyJWT] },
    async (req: FastifyRequest, reply: FastifyReply) => {
      return new DetailUserController().handle(req, reply)
    },
  )
}
