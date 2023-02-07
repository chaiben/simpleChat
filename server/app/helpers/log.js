require('dotenv').config()

const log = (msg) => {
  if (process.env.NODE_ENV === 'dev') {
    console.log(msg)
  }
}
module.exports = log
