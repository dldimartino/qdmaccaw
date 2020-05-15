const router = require('express').Router()
const {User, Game, Round, Room} = require('../db/models')
module.exports = router

// find all players
router.get('/', async (req, res, next) => {
  try {
    const players = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: [
        'id',
        'name',
        'email',
        'imageUrl',
        'wins',
        'gamesPlayed',
        'munnyPoints',
        'isArtist',
      ],
    })
    res.json(players)
  } catch (error) {
    next(error)
  }
})

// route to find a user by Pk
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {include: {Game}})
    if (user) {
      res.json(user)
    } else {
      res.status(404).json('none found')
    }
  } catch (error) {
    next(error)
  }
})

//add player to round (through: playersOfRound)
router.put('/:playerId/setAsPlayer/:roundId', async (req, res, next) => {
  try {
    const player = await User.findByPk(req.params.playerId)
    const round = await Round.findByPk(req.params.roundId)
    const playerOfRound = await round.addChild(player, {
      through: 'playersOfRound',
    })
    if (playerOfRound) {
      res.status(200).json(playerOfRound)
    }
  } catch (error) {
    next(error)
  }
})

//add player as a round winner (through: winnersOfRound)
//increments won games by 1
router.put('/:playerId/setAsRoundWinner/:roundId', async (req, res, next) => {
  try {
    const player = await User.findByPk(req.params.playerId)
    const round = await Round.findByPk(req.params.roundId)
    const winnerOfRound = await round.addWinnersOfRound(player)
    if (winnerOfRound) {
      let wins = player.wins
      player.wins = wins + 1
      res.status(200).json(winnerOfRound)
    }
  } catch (error) {
    next(error)
  }
})

//add player to a room
router.put('/:playerId/joinRoom/:roomId', async (req, res, next) => {
  try {
    const player = await User.findByPk(req.params.playerId)
    const room = await Room.findByPk(req.params.roomId)
    const joinedPlayer = await room.addChild(player)
    if (joinedPlayer) {
      res.status(200).json(joinedPlayer)
    } else {
      res.status(400).json('something went wrong associating room')
    }
  } catch (error) {
    next(error)
  }
})

// //route to update "winner" status of player to "TRUE"
// router.put('/:id/winner', async (req, res, next) => {
//   try {
//     // console.log('inside route')
//     const user = await User.findByPk(1)
//     // console.log('user', user)
//     await user.update({winner: true})
//     user.reload()
//     res.status(200).json(user)
//   } catch (error) {
//     next(error)
//   }
// })

// //route to update "winner" status of player to "FALSE"
// router.put('/:id/loser', async (req, res, next) => {
//   try {
//     const player = await User.findByPk(req.params.id)
//     await player.update({winner: false})
//     player.reload()
//     res.status(200).json(player)
//   } catch (error) {
//     next(error)
//   }
// })
