module.exports = (sequelize, type) => {
  return sequelize.define('user', {
    user_id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: type.STRING,
      unique: true
    },
    displayname: {
      type: type.STRING
    },
    password: type.STRING
  })
}
