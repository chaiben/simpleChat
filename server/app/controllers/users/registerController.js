const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const Response = require('../../models/Response')
const MESSAGES = require('../../helpers/helper')
const { User } = require('../../db')

const registerController = async (req, res) => {
  const response = new Response()
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    response.setStatus(false)
    response.setError(errors.array())
    return res.status(422).json(response)
  }
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10)
    const user = await User.create(req.body)
    response.addMessage(MESSAGES.USERREGISTERED)
    response.setPayload(user)
    res.json(response)
  } catch (err) {
    response.setStatus(false)
    let errorMsg = err.errors[0].message
    if (errorMsg === 'userName must be unique') {
      errorMsg = MESSAGES.USERNAMECONFLICT
    }
    response.addError(errorMsg)
    return res.status(409).json(response)
  }
}

module.exports = registerController
