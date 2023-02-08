// routes/api/rooms.js
const router = require('express').Router()
const {
  getRoomsController,
  createController,
  createValidation
} = require('../../controllers/rooms')

require('dotenv').config()

module.exports = router

router.get('/', async (req, res) => {
  await getRoomsController(req, res)
})

router.post('/create', createValidation, async (req, res) => {
  await createController(req, res)
})
