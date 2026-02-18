const Razorpay = require('razorpay');
const crypto = require('crypto');
const prisma = require('../config/db');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
    const { amount, items } = req.body;
    const userId = req.userId;

    try {
        // Validate products
        const productIds = items.map(item => parseInt(item.id));
        const products = await prisma.product.findMany({
            where: {
                id: { in: productIds }
            }
        });

        if (products.length !== items.length) {
            return res.status(400).json({ error: "Some products in your cart are no longer available." });
        }

        // 1. Create order in Razorpay
        const options = {
            amount: Math.round(amount * 100), // amount in the smallest currency unit (paise for INR)
            currency: "INR",
            receipt: `rcpt_${Date.now()}`,
        };

        const rzpOrder = await razorpay.orders.create(options);

        // 2. Save order in our database
        const order = await prisma.order.create({
            data: {
                userId: parseInt(userId),
                totalAmount: amount,
                status: "PENDING",
                razorpayOrderId: rzpOrder.id,
                items: {
                    create: items.map(item => ({
                        productId: parseInt(item.id),
                        quantity: parseInt(item.quantity),
                        price: parseFloat(item.price)
                    }))
                }
            }
        });

        res.json({
            success: true,
            orderId: rzpOrder.id,
            amount: rzpOrder.amount,
            currency: rzpOrder.currency,
            dbOrderId: order.id
        });
    } catch (error) {
        console.error("Error creating payment order:", error);
        res.status(500).json({ error: "Failed to create payment order" });
    }
};

exports.verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    try {
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            // Payment verified
            const updatedOrder = await prisma.order.update({
                where: { razorpayOrderId: razorpay_order_id },
                data: {
                    status: "PAID",
                    paymentId: razorpay_payment_id
                }
            });

            res.json({ success: true, message: "Payment verified successfully", orderId: updatedOrder.id });
        } else {
            res.status(400).json({ success: false, message: "Invalid signature" });
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({ error: "Internal server error during verification" });
    }
};

exports.getUserOrders = async (req, res) => {
    const userId = req.userId;
    try {
        const orders = await prisma.order.findMany({
            where: { userId: parseInt(userId) },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        res.json(orders);
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
};
