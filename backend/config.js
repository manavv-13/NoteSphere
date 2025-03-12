require('dotenv').config();

const config = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    JWT_SECRET: process.env.JWT_SECRET
};

module.exports = config;