require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '1346',
    database: process.env.DB_NAME || 'pingui',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
  },
};
