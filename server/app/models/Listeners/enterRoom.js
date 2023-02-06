const { User, Room, UserRoom } = require('../../db')
const { newMessage } = require('./newMessage')
const enterRoom = async (serverSocket, userId, roomName) => {
  console.log('enterRoom info:', userId, roomName)
  try {
    // Recupera el usuario y el room
    const user = await User.findByPk(userId)
    const room = roomName ? await Room.findOne({ where: { roomName } }) : 0

    // Borra cualquier registro antiguo
    await UserRoom.destroy({ where: { userId: user.userId } })

    // Escribe el nuevo room
    if (room) {
      user.addRoom(room)
    }

    // Recupera la lista de rooms con los usuarios
    const rooms = await User.findAll({
      include: [
        {
          model: Room,
          as: 'rooms'
        }
      ]
    })

    if (roomName) {
      const data = {
        userId: null,
        roomName,
        message: `Joined ${user.displayName}`
      }

      newMessage(serverSocket, data)
    }

    serverSocket.io.emit('update_user_room', { user, room, rooms })
  } catch (err) {
    console.log('update_user_room fail:', err)
  }
}

module.exports = { enterRoom }
