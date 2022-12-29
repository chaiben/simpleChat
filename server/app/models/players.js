const MESSAGES = require('../helpers/helper')

module.exports = (sequelize, type) => {
  return sequelize.define('player', {
    player_id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: type.STRING,
      defaultValue: null,
      unique: true,
      set (username) {
        (typeof username === 'string' && username.trim()) ? this.setDataValue('username', username.trim()) : this.setDataValue('username', null)
      },
      get () {
        return this.getDataValue('username') ? this.getDataValue('username') : MESSAGES.ANONYMOUS
      }
    },
    average: {
      type: type.VIRTUAL,
      set (value) {
        this.setDataValue('average', value)
      }
    }
  })
}
