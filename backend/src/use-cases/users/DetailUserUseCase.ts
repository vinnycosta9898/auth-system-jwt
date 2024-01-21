import { ResourceNotFound } from '../../errors/resource-not-found-error'
import { prisma } from '../../lib/prisma'

export type DetailsUserUseCaseRequest = {
  id: string
}

export class DetailsUserUseCase {
  async execute({ id }: DetailsUserUseCaseRequest) {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    })

    if (!user) {
      throw new ResourceNotFound()
    }

    return {
      user,
    }
  }
}
