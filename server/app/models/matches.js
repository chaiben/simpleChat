const MESSAGES = require('../helpers/helper')
const Dice = require('./Dice')

module.exports = (sequelize, type) => {
  return sequelize.define('match', {
    match_id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    player_id: {
      type: type.INTEGER,
      references: {
        model: 'players',
        key: 'player_id'
      },
      set (playerId) {
        this.setDataValue('player_id', playerId)
        this.setDataValue('dice1', new Dice().roll())
        this.setDataValue('dice2', new Dice().roll())
        const total = this.getDataValue('dice1') + this.getDataValue('dice2')
        this.setDataValue('result', total === 7 ? 1 : 0)
      }
    },
    dice1: type.INTEGER,
    dice2: type.INTEGER,
    result: {
      type: type.BOOLEAN,
      get () {
        return this.getDataValue('result') ? MESSAGES.WIN : MESSAGES.LOSE
      }
    }
  })
}
