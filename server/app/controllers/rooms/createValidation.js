const { check } = require('express-validator')
const MESSAGES = require('../../helpers/helper')

const createValidation = [
  check('roomName', MESSAGES.ROOMNAMEREQUIRED).not().isEmpty()
]

module.exports = createValidation
