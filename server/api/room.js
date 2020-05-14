const router = require('express').Router()
const Room = require('../db/models/room')
const User = require('../db/models/user')

router.get('/', async (req, res, next) => {
  try {
    const allRoom = await Room.findAll({
      include: [User],
    })
    res.json(allRoom)
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const allRoom = await Room.findAll({
      include: [User],
    })
    res.json(allRoom)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {name} = req.body
    const newRoom = await Room.create({name})
    res.json(newRoom)
  } catch (error) {
    next(error)
  }
})

// '/play/:roomId' - path to room
router.put('/:playerId/:roomId', async (req, res, next) => {
  try {
    console.log('hi there')
    const player = await User.findByPk(req.params.playerId)
    console.log('player: ', player)
    const room = await Room.findByPk(req.params.roomId)
    console.log('room: ', room)
    await room.setChild(player)
    res.status(200)
    // if (joinedPlayer) {
    //   res.status(200).json(joinedPlayer)
    // } else {
    //   res.status(400).json('something went wrong associating room')
    // }
  } catch (error) {
    next(error)
  }
})

module.exports = router
