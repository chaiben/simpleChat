const moment = require('moment')
const jwt = require('jwt-simple')

const createToken = (user) => {
  const payload = {
    userId: user.userId,
    userName: user.userName,
    displayName: user.displayName,
    createdAt: moment().unix(),
    expiredAt: moment().add(24, 'hours').unix()
  }
  return jwt.encode(payload, process.env.JWT_SECRET_KEY)
}

module.exports = createToken
