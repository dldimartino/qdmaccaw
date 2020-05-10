const router = require('express').Router()
const Word = require('../db/models/word')

router.get('/', async (req, res, next) => {
  try {
    const allWord = await Word.findAll()
    res.json(allWord)
  } catch (error) {
    next(error)
  }
})

module.exports = router
