import { InvalidCredentials } from '../../errors/invalid-credentials-error'
import { UserNotExists } from '../../errors/user-not-exists-error'
import { prisma } from '../../lib/prisma'
import { compare } from 'bcryptjs'

export type AuthUserUseCaseProps = {
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
      throw new UserNotExists()
    }

    const doesPasswordMatches = await compare(password, user.password)

    if (!doesPasswordMatches) {
      throw new InvalidCredentials()
    }

    return {
      user,
    }
  }
}
