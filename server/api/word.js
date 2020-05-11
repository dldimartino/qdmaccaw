const router = require('express').Router()
const Word = require('../db/models/word')
const Room = require('../db/models/room')
const User = require('../db/models/user')

router.get('/', async (req, res, next) => {
  try {
    const allWords = await Word.findAll()
    res.json(allWords)
  } catch (error) {
    next(error)
  }
})

router.get('/:roomId', async (req, res, next) => {
  try {
    const singleRoom = await Room.findByPk(req.params.roomId, {
      include: [User]
    })
    res.json(singleRoom)
  } catch (error) {
    next(error)
  }
})

module.exports = router
