const Sequelize = require('sequelize');
const config = require('./config');

// Configuración de la base de datos
const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: config.development.host,
  dialect: config.development.dialect,
});

module.exports = sequelize;
