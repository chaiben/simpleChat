// routes/api/users.js
const router = require('express').Router()
const bcrypt = require('bcryptjs')
const { User } = require('../../db')
const { check, validationResult } = require('express-validator')
const moment = require('moment')
const jwt = require('jwt-simple')
const MESSAGES = require('../../helpers/helper')
const Response = require('../../models/Response')

router.post('/register', [
  check('userName', MESSAGES.USERREQUIRED).not().isEmpty(),
  check('displayName', MESSAGES.DISPLAYNAMEREQUIRED).not().isEmpty(),
  check('password', MESSAGES.PASSWORDREQUIRED).not().isEmpty()
], async (req, res) => {
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
    response.addError(err.errors[0].message)
    return res.status(409).json(response)
  }
})

router.post('/login', async (req, res) => {
  const response = new Response()
  try {
    if (!req.body.userName || !req.body.password) {
      response.setStatus(false)
      response.addError(MESSAGES.MISSINGUSERNAMEORPASS)
      return res.status(422).json(response)
    }
    const user = await User.findOne({ where: { userName: req.body.userName } })
    if (user) {
      const valid = bcrypt.compareSync(req.body.password, user.password)
      if (valid) {
        response.setPayload({ success: createToken(user) })
        res.json(response)
      } else {
        response.setStatus(false)
        response.addError(MESSAGES.WRONGUSERORPASS)
        res.json(response)
      }
    } else {
      response.setStatus(false)
      response.addError(MESSAGES.WRONGUSERORPASS)
      res.json(response)
    }
  } catch (err) {
    response.setStatus(false)
    response.setError(err)
    res.status(422).json(response)
  }
})

const createToken = (user) => {
  const payload = {
    usuarioId: user.id,
    createdAt: moment().unix(),
    expiredAt: moment().add(5, 'minutes').unix()
  }

  return jwt.encode(payload, 'frase secreta')
}

router.post('/unsubscribe', async (req, res) => {
  const response = new Response()
  try {
    if (!req.body.userName || !req.body.password) {
      response.setStatus(false)
      response.addError(MESSAGES.MISSINGUSERNAMEORPASS)
      return res.status(422).json(response)
    }
    const user = await User.findOne({ where: { userName: req.body.userName } })
    if (user) {
      const valid = bcrypt.compareSync(req.body.password, user.password)
      if (valid) {
        const countResponse = User.destroy({
          where: {
            userId: user.userId
          }
        })
        response.setPayload({ deleted: !!countResponse })
        res.json(response)
      } else {
        response.setStatus(false)
        response.addError(MESSAGES.WRONGUSERORPASS)
        res.status(401).json(response)
      }
    } else {
      response.setStatus(false)
      response.addError(MESSAGES.WRONGUSERORPASS)
      res.status(401).json(response)
    }
  } catch (err) {
    response.setStatus(false)
    response.setError(err)
    res.status(422).json(response)
  }
})

module.exports = router
