import { PrismaClient } from "@prisma/client";

const globalFOrPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = 
    globalFOrPrisma.prisma ||
    new PrismaClient({
        log: ["query"],
    })

if (process.env.NODE_ENV !== "production") globalFOrPrisma.prisma;