const router = require('express').Router()
const {User, Game} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
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
        'isArtist'
      ]
    })
    res.json(users)
  } catch (error) {
    next(error)
  }
})

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

router.put('/:id/winner', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {include: {Game}})
    user.winner = true
    User.reload()
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
})

router.put('/:id/loser', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {include: {Game}})
    user.winner = true
    User.reload()
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
})
