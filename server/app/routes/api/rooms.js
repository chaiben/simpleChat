// routes/api/rooms.js
const router = require('express').Router()
const { Room } = require('../../db')
const MESSAGES = require('../../helpers/helper')
const Response = require('../../models/Response')
const { check, validationResult } = require('express-validator')

require('dotenv').config()

module.exports = router

router.get('/', async (req, res) => {
  const response = new Response()
  try {
    const rooms = await Room.findAll()

    response.setPayload(rooms)
    res.status(200).json(response)
  } catch (err) {
    response.setStatus(false)
    response.addError(err.message)
    res.status(400).json(response)
  }
})

router.post(
  '/create',
  [check('roomName', MESSAGES.ROOMNAMEREQUIRED).not().isEmpty()],
  async (req, res) => {
    const response = new Response()
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      response.setStatus(false)
      response.setError(errors.array())
      return res.status(422).json(response)
    }
    try {
      // Created room
      const room = await Room.create(req.body)

      // Send response
      response.addMessage(MESSAGES.ROOMREGISTERED)
      response.setPayload(room)
      res.json(response)
      // Socket call
    } catch (err) {
      response.setStatus(false)
      response.addError(err.errors[0].message)
      return res.status(400).json(response)
    }
  }
)
