const prisma = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_key";

exports.googleLogin = async (req, res) => {
    const { token, access_token } = req.body;
    try {
        let email, name;

        if (token) {
            // Verify ID Token
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            email = payload.email;
            name = payload.name;
        } else if (access_token) {
            // Verify Access Token via Google's userinfo endpoint
            const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
            const data = await response.json();

            if (!data.email) {
                throw new Error("Invalid access token");
            }
            email = data.email;
            name = data.name;
        } else {
            return res.status(400).json({ error: "No token provided" });
        }

        let user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    email,
                    name,
                },
            });
        }

        const jwtToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });
        res.json({
            message: 'Google login successful',
            token: jwtToken,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                phone: user.phone,
                location: user.location,
                profileImage: user.profileImage
            }
        });
    } catch (error) {
        console.error("Google Auth Error:", error);
        res.status(401).json({ error: 'Google authentication failed' });
    }
};

exports.signup = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
            },
        });
        res.status(201).json({ message: "User created successfully", user: { id: newUser.id, email: newUser.email, name: newUser.name } });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2002') {
            return res.status(400).json({ error: 'Email already exists' });
        }
        res.status(500).json({ error: 'Failed to create user' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });
        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                phone: user.phone,
                location: user.location,
                profileImage: user.profileImage
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Login failed' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: { id: true, email: true, name: true }
        });
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

exports.createUser = async (req, res) => {
    const { email, name, password } = req.body;
    try {
        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                password: password ? await bcrypt.hash(password, 10) : null
            },
        });
        res.json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create user' });
    }
};

// GET user by ID
exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) },
        });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};

// UPDATE user
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, phone, location, profileImage } = req.body;
    try {
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { name, phone, location, profileImage },
        });
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update user' });
    }
};

exports.getMe = async (req, res) => {
    try {
        // Assume auth middleware adds user to req.user
        // If no auth middleware yet, we'll need to decode token here or just use id from params for now
        // But for a proper "me" endpoint, we need auth middleware.
        // Let's see if index.js has auth middleware.
        const userId = req.userId; // This should be set by auth middleware
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch user data" });
    }
};

// DELETE user
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.user.delete({
            where: { id: parseInt(id) },
        });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

