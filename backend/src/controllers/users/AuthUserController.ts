import { FastifyReply, FastifyRequest } from 'fastify'
import {
  AuthUserUseCase,
  AuthUserUseCaseProps,
} from '../../use-cases/users/AuthUserUseCase'
import { UserNotExists } from '../../errors/user-not-exists-error'

export class AuthUserController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, password } = req.body as AuthUserUseCaseProps

      const authUserUseCase = new AuthUserUseCase()

      const { user } = await authUserUseCase.execute({
        email,
        password,
      })

      const token = await reply.jwtSign(
        {},
        {
          sign: {
            sub: user.id,
          },
        },
      )

      return reply.status(200).send({
        id: user.id,
        name: user.name,
        email: user.email,
        token,
      })
    } catch (err) {
      if (err instanceof UserNotExists) {
        return reply.status(404).send({ error: 'User not exists' })
      } else {
        return reply.status(403).send({ error: 'Credentials Invalid' })
      }
    }
  }
}
