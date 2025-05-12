const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const SCP = sequelize.define('SCP', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    objectClass: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    procedures: {
        type: DataTypes.TEXT
    }
});

module.exports = SCP;
