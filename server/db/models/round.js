const Sequelize = require('sequelize')
const db = require('../db')

const Round = db.define('round', {
  word: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
})

module.exports = Round
