const prisma = require('./config/db');

async function listProducts() {
    try {
        const products = await prisma.product.findMany();
        console.log("Available Products:", products.map(p => ({ id: p.id, name: p.name })));
    } catch (error) {
        console.error("Error:", error);
    } finally {
        await prisma.$disconnect();
    }
}

listProducts();
