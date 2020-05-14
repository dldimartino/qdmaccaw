const db = require('../db')
const User = require('./user')
const Room = require('./room')
const Word = require('./word')
const Game = require('./game')
const Round = require('./round')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Room.hasMany(User)
User.belongsTo(Room)

Game.hasMany(Round)
Round.belongsTo(Game)

Round.belongsToMany(User, {through: 'playersInRound'})
User.belongsToMany(Round, {through: 'playersInRound'})

Round.belongsToMany(User, {through: 'winnersOfRound'})
User.belongsToMany(Round, {through: 'winnersOfRound'})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  db,
  User,
  Room,
  Word,
  Game,
  Round
}
