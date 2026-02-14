const { PrismaClient } = require("../generated/prisma");
const { PrismaMariaDb } = require("@prisma/adapter-mariadb");
const mariadb = require("mariadb");

// Create a MariaDB connection pool
// Using port 3307 as per docker-compose mapping
const pool = mariadb.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3307,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'piyu1234',
    database: process.env.DB_NAME || 'maria',
    connectionLimit: 5,
});

// Create the adapter and pass it to PrismaClient
const adapter = new PrismaMariaDb(pool);
const prisma = new PrismaClient({ adapter });

module.exports = prisma;
