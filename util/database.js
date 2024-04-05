const Sequelize = require('sequelize');

const ck = require('ckey');

const sequelize = new Sequelize('nodecomplete', 'root', ck.PASSWORD, {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;
