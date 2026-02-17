const { PrismaClient } = require("@prisma/client");

// Simple Prisma Client for Prisma 6
const prisma = new PrismaClient({
    log: ['error', 'warn']
});

module.exports = prisma;
