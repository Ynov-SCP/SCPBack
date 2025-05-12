const sequelize = require('../config/db');
const User = require('./user');
const SCP = require('./scp');

const initModels = async () => {
    await sequelize.sync({ alter: true });
};

module.exports = {
    sequelize,
    initModels,
    User,
    SCP,
};
