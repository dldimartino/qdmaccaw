const router = require('express').Router()
const Room = require('../db/models/room')
const User = require('../db/models/user')

router.get('/', async (req, res, next) => {
  try {
    const allRoom = await Room.findAll({
      include: [User]
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

module.exports = router
