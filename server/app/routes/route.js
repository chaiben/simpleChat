const router = require('express').Router()
// const middleware = require('../middlewares/middleware')

const usersRouter = require('./api/users')
const notFoundRouter = require('./api/notfound')

// router.use('/players', middleware.checkToken, playersRouter)
router.use('/users', usersRouter)
router.use('*', notFoundRouter)

module.exports = router
