const prisma = require("../config/db");

exports.getAllProducts = async (req, res) => {
    try {
        const { category, search, page = 1, limit = 8, minPrice, maxPrice, sort } = req.query;

        const where = {};

        if (category && category !== "ALL") {
            where.category = category;
        }

        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } }
            ];
        }

        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice) where.price.gte = parseFloat(minPrice);
            if (maxPrice) where.price.lte = parseFloat(maxPrice);
        }

        let orderBy = { createdAt: 'desc' };
        if (sort === 'price_asc') {
            orderBy = { price: 'asc' };
        } else if (sort === 'price_desc') {
            orderBy = { price: 'desc' };
        } else if (sort === 'newest') {
            orderBy = { createdAt: 'desc' };
        }

        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;

        const [products, total] = await Promise.all([
            prisma.product.findMany({
                where,
                skip,
                take: limitNum,
                orderBy
            }),
            prisma.product.count({ where })
        ]);

        res.json({
            products,
            total,
            page: pageNum,
            totalPages: Math.ceil(total / limitNum)
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Failed to fetch products" });
    }
};

exports.getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(id) },
            include: {
                reviews: {
                    include: { user: { select: { name: true, profileImage: true } } }
                }
            }
        });

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        const totalReviews = product.reviews.length;
        const avgRating = totalReviews > 0
            ? product.reviews.reduce((acc, rev) => acc + rev.rating, 0) / totalReviews
            : 0;

        res.json({ ...product, avgRating, totalReviews });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: "Failed to fetch product" });
    }
};

exports.createProduct = async (req, res) => {
    const { name, description, price, category, image, stock } = req.body;
    try {
        const newProduct = await prisma.product.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                category,
                image,
                stock: parseInt(stock) || 0
            }
        });
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Failed to create product" });
    }
};
