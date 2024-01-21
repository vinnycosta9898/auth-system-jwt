import { FastifyReply, FastifyRequest } from 'fastify'
import {
  AuthUserUseCase,
  AuthUserUseCaseProps,
} from '../../use-cases/users/AuthUserUseCase'

export class AuthUserController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, password } = req.body as AuthUserUseCaseProps

      const authUserUseCase = new AuthUserUseCase()

      await authUserUseCase.execute({
        email,
        password,
      })

      return reply.status(200)
    } catch (err) {
      console.log(err)
    }
  }
}
