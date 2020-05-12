const Sequelize = require('sequelize')
const db = require('../db')

const WinnerStatus = db.define('winnerStatus', {
  correct: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = WinnerStatus
