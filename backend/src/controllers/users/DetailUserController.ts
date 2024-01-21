import { FastifyRequest, FastifyReply } from 'fastify'
import {
  DetailsUserUseCaseRequest,
  DetailsUserUseCase,
} from '../../use-cases/users/DetailUserUseCase'

export class DetailUserController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = req.body as DetailsUserUseCaseRequest

      const detailsUserUseCase = new DetailsUserUseCase()

      await detailsUserUseCase.execute({
        id,
      })
    } catch (err) {
      console.log(err)
    }
  }
}
