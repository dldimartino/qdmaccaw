const Sequelize = require('sequelize')
const db = require('../db')

const Word = db.define('word', {
  content: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  category: {
    type: Sequelize.STRING,
    defaultValue: 'General'
  },
  difficulty: {
    type: Sequelize.STRING,
    defaultValue: 'Medium',
    validate: {
      isIn: [['Easy', 'Medium', 'Hard']]
    }
  }
})

module.exports = Word
