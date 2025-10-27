import { PrismaClient } from "@prisma/client";

//Reuse prisma client instances across reload in development
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

// Create a new Prisma client
export const prisma = globalForPrisma.prisma ?? new PrismaClient({log: ["error", "warn"]})

// In dev mode, store the client globally to prevent multiple instances
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;