import { FastifyRequest, FastifyReply } from 'fastify'
import { DetailsUserUseCase } from '../../use-cases/users/DetailUserUseCase'
import { ResourceNotFound } from '../../errors/resource-not-found-error'

export class DetailUserController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    try {
      const detailsUserUseCase = new DetailsUserUseCase()

      const { user } = await detailsUserUseCase.execute({
        id: req.user.sub,
      })

      return reply.status(200).send({
        user: {
          ...user,
          password: undefined,
        },
      })
    } catch (err) {
      if (err instanceof ResourceNotFound) {
        return reply.status(404).send({ error: 'User not found' })
      }
    }
  }
}
