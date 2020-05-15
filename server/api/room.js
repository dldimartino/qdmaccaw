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

router.get('/:roomId', async (req, res, next) => {
  try {
    const players = await User.findAll({
      where: {roomId: req.params.roomId},
    })
    res.json(players)
  } catch (error) {
    next(error)
  }
})

router.put('/:roomId/:playerId/join', async (req, res, next) => {
  try {
    const room = await Room.findByPk(req.params.roomId)
    const player = await User.findByPk(req.params.playerId)
    const newUser = await player.setRoom(room)
    res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
})

router.put('/:roomId/:playerId/leave', async (req, res, next) => {
  try {
    const room = await Room.findByPk(req.params.roomId)
    const player = await User.findByPk(req.params.playerId)
    const leftUser = await player.setRoom(null)
    res.status(201).json(leftUser)
  } catch (error) {
    next(error)
  }
})

module.exports = router
