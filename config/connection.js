// config/connection.js
require('dotenv').config();  // Make sure dotenv is being used to load environment variables

const { Sequelize } = require('sequelize');

// Setup sequelize connection using environment variables
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',  // Using PostgreSQL as the database
    logging: false,       // Optional: To disable SQL logging
});

module.exports = sequelize;
