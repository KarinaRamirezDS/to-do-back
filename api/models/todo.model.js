const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');

const Todo = sequelize.define('todo', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true
  },
  content: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(10),
    allowNull: false,
    defaultValue: 'active'
  }
});

module.exports = { Todo };
