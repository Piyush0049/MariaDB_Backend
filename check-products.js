const prisma = require('./config/db');

async function checkProducts() {
    try {
        const products = await prisma.product.findMany();
        console.log("Products in DB:", products.map(p => ({ id: p.id, name: p.name })));
    } catch (error) {
        console.error("Error checking products:", error);
    } finally {
        await prisma.$disconnect();
    }
}

checkProducts();
