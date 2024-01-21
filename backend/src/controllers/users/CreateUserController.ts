import { Prisma } from '@prisma/client'
import { FastifyRequest, FastifyReply } from 'fastify'
import { CreateUserUseCase } from '../../use-cases/users/CreateUserUseCase'

export class CreateUserController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, email, password } = req.body as Prisma.UserCreateInput

      const createUserUseCase = new CreateUserUseCase()

      await createUserUseCase.execute({
        name,
        email,
        password,
      })

      return reply.status(201)
    } catch (err) {
      console.log(err)
    }
  }
}
