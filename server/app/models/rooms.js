module.exports = (sequelize, type) => {
  return sequelize.define('room', {
    roomId: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    roomName: {
      type: type.STRING
    }
  })
}
