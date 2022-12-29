const router = require('express').Router()
const middleware = require('../middlewares/middleware')

const playersRouter = require('./api/players')
const rankingRouter = require('./api/ranking')
const gamesRouter = require('./api/games')
const usersRouter = require('./api/users')
const notFoundRouter = require('./api/notfound')

router.use('/players', middleware.checkToken, playersRouter)
router.use('/ranking', middleware.checkToken, rankingRouter)
router.use('/games', middleware.checkToken, gamesRouter)
router.use('/users', usersRouter)
router.use('*', notFoundRouter)

module.exports = router
