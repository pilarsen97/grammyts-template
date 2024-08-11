// import pkg from '@prisma/client'
import { prisma } from '../../prisma/index.js'

// const { UserRole } = pkg

export class User {
  private prisma
  public telegramId: number
  public id?: number

  constructor(telegramId: number) {
    this.prisma = prisma
    this.telegramId = telegramId
  }

  private async findUser() {
    const user = await this.prisma.user.findUnique({
      where: { telegramId: this.telegramId },
    })

    if (!user) {
      throw new Error('User not found')
    }

    this.id = user.id
    return user
  }

  async initialize() {
    await this.findUser()
  }

  async exists(): Promise<boolean> {
    try {
      await this.findUser()
      return true
    }
    catch {
      return false
    }
  }

  async upsert(telegramId: number, username: string) {
    await this.prisma.user.upsert({
      where: { telegramId },
      update: {
        updatedAt: new Date(),
        username,
      },
      create: { telegramId, username },
    })
  }
}
