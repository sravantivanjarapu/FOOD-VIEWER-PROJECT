require('dotenv').config();

module.exports = {
    jwtSecret: process.env.JWT_SECRET,
    mongoURI: process.env.MONGO_URI,
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    }
};