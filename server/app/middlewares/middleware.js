const jwt = require('jwt-simple')
const moment = require('moment')
const Response = require('../models/Response')
const MESSAGES = require('../helpers/helper')
require('dotenv').config()

const addNoCacheHeader = (req, res, next) => {
  res.set({
    'Cache-Control': 'no-cache'
  })
  next()
}

const checkToken = (req, res, next) => {
  const response = new Response()
  if (!req.headers['user-token']) {
    response.setStatus(false)
    response.addError(MESSAGES.MISSINGTOKENHEADER)
    return res.status(401).json(response)
  }

  const userToken = req.headers['user-token']
  let payload = {}

  try {
    payload = jwt.decode(userToken, process.env.JWT_SECRET_KEY)
  } catch (err) {
    response.setStatus(false)
    response.addError(MESSAGES.INVAIDTOKEN)
    return res.status(401).json(response)
  }

  if (payload.expiredAt < moment().unix()) {
    response.setStatus(false)
    response.addError(MESSAGES.TOKENEXPIRED)
    return res.status(401).json(response)
  }

  req.usuarioId = payload.usuarioId

  next()
}

module.exports = {
  addNoCacheHeader,
  checkToken
}
