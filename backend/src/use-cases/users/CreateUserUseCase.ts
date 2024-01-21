import { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { hash } from 'bcryptjs'

type CreateUserUseCaseRequest = Prisma.UserCreateInput

export class CreateUserUseCase {
  async execute({ name, email, password }: CreateUserUseCaseRequest) {
    const hasUserWithSameEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (hasUserWithSameEmail) {
      throw new Error('User already exists')
    }

    const password_hash = await hash(password, 8)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: password_hash,
      },
    })

    return {
      user,
    }
  }
}
