const Sequelize = require('sequelize')
require('dotenv').config()
const UserModel = require('./models/users')
const RoomModel = require('./models/rooms')

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql'
  }
)

const User = UserModel(sequelize, Sequelize)
const Room = RoomModel(sequelize, Sequelize)

sequelize.sync({ force: false }).then(() => {
  console.log('Table sincronized')
})

module.exports = {
  Room,
  Sequelize,
  User,
  sequelize
}
