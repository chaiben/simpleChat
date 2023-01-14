const router = require('express').Router()
const middleware = require('../middlewares/middleware')

const notFoundRouter = require('./api/notfound')
const roomsRouter = require('./api/rooms')
const usersRouter = require('./api/users')

// router.use('/players', middleware.checkToken, playersRouter)
router.use('/users', usersRouter)
router.use('/rooms', middleware.checkToken, roomsRouter)
router.use('*', notFoundRouter)

module.exports = router
