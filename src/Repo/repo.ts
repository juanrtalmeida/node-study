import { PrismaClient } from '@prisma/client'

export function repo() {
	const prisma = new PrismaClient()
	return prisma
}
