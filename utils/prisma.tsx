// prismaClient.ts
import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient | undefined

function prismaClient(): PrismaClient {
  if (!prisma) {
    prisma = new PrismaClient()
  }
  return prisma
}

export default prismaClient
