const router = require('express').Router()
const Word = require('../db/models/word')

router.get('/', async (req, res, next) => {
  try {
    const allWords = await Word.findAll()
    res.json(allWords)
  } catch (error) {
    next(error)
  }
})

module.exports = router
