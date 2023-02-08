const { check } = require('express-validator')
const MESSAGES = require('../../helpers/helper')

const registerValidation = [
  check('userName', MESSAGES.USERREQUIRED).not().isEmpty(),
  check('displayName', MESSAGES.DISPLAYNAMEREQUIRED).not().isEmpty(),
  check('password', MESSAGES.PASSWORDREQUIRED).not().isEmpty()
]

module.exports = registerValidation
