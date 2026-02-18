const prisma = require("../config/db");

exports.addReview = async (req, res) => {
    const { productId, rating, comment } = req.body;
    const userId = req.userId;

    try {
        const review = await prisma.review.upsert({
            where: {
                userId_productId: {
                    userId: parseInt(userId),
                    productId: parseInt(productId)
                }
            },
            update: {
                rating: parseInt(rating),
                comment
            },
            create: {
                userId: parseInt(userId),
                productId: parseInt(productId),
                rating: parseInt(rating),
                comment
            }
        });
        res.json(review);
    } catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ error: "Failed to add review" });
    }
};

exports.getProductReviews = async (req, res) => {
    const { productId } = req.params;
    try {
        const reviews = await prisma.review.findMany({
            where: { productId: parseInt(productId) },
            include: { user: { select: { name: true, profileImage: true } } },
            orderBy: { createdAt: 'desc' }
        });
        res.json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: "Failed to fetch reviews" });
    }
};
