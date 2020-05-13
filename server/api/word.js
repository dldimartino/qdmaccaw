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

router.get('/random', async (req, res, next) => {
  try {
    // console.log("INSIDE ROUTE")
    const words = await Word.findAndCountAll()
    const length = Number(words.count)
    const randomNum = Math.floor(Math.random() * (length - 1)) + 1
    //The maximum is exclusive and the minimum is inclusive
    // console.log("length", length)
    // console.log("random num", randomNum)
    const foundWord = await Word.findByPk(randomNum)
    // console.log("FOUND WORD ---------->>>>>>>>>", foundWord.dataValues.content)
    if (foundWord) {
      res.status(200).json(foundWord.content)
    } else {
      res.status(404).json('no word found')
    }
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
