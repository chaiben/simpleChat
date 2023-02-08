// routes/api/users.js
const router = require('express').Router()
const { check } = require('express-validator')

const {
  registerController,
  loginController,
  tokenInfoController,
  unsubscribeController
} = require('../../controllers/users')
const MESSAGES = require('../../helpers/helper')

require('dotenv').config()

router.post(
  '/register',
  [
    check('userName', MESSAGES.USERREQUIRED).not().isEmpty(),
    check('displayName', MESSAGES.DISPLAYNAMEREQUIRED).not().isEmpty(),
    check('password', MESSAGES.PASSWORDREQUIRED).not().isEmpty()
  ],
  async (req, res) => {
    await registerController(req, res)
  }
)

router.post('/login', async (req, res) => {
  await loginController(req, res)
})

router.post('/tokeninfo', async (req, res) => {
  await tokenInfoController(req, res)
})
router.post('/unsubscribe', async (req, res) => {
  await unsubscribeController(req, res)
})

module.exports = router
