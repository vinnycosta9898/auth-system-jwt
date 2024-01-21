import { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { compare } from 'bcryptjs'

type AuthUserUseCaseProps = {
  email: string
  password: string
}

export class AuthUserUseCase {
  async execute({ email, password }: AuthUserUseCaseProps) {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (!user) {
      throw new Error('User not exists')
    }

    const doesPasswordMatches = await compare(password, user.password)

    if (!doesPasswordMatches) {
      throw new Error('Invalid credentials')
    }

    return {
      user,
    }
  }
}