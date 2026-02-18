const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
    try {
        console.log('Testing database connection...');
        const products = await prisma.product.findMany({ take: 1 });
        console.log('Connection successful! Found products:', products.length);
    } catch (error) {
        console.error('Connection failed:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

test();
