const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

User.beforeCreate(async (user, options) => {
  user.password = await bcrypt.hash(user.password, saltRounds);
});

// Hook para hashear senha antes de atualizar, caso tenha sido alterada
User.beforeUpdate(async (user, options) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
});

module.exports = User;