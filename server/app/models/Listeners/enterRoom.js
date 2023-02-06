const { User, Room, UserRoom } = require('../../db')
const { newMessage } = require('./newMessage')
const enterRoom = async (serverSocket, userId, roomName) => {
  console.log('enterRoom info:', userId, roomName)
  try {
    // Recupera el usuario y el room
    const user = await User.findByPk(userId)
    const newRoom = roomName ? await Room.findOne({ where: { roomName } }) : 0

    // Recupera los datos del room antiguo
    const oldUserRoom = await UserRoom.findOne({ where: { userId } })
    const oldRoom = oldUserRoom?.roomId
      ? await Room.findByPk(oldUserRoom.roomId)
      : 0

    // Borra cualquier registro antiguo
    await UserRoom.destroy({ where: { userId: user.userId } })

    // Escribe el nuevo room
    if (newRoom) {
      user.addRoom(newRoom)
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
        message: `${user.displayName} join the room`
      }

      newMessage(serverSocket, data)
    }

    if (oldRoom !== 0 && newRoom === 0) {
      // User leaved room
      const data = {
        userId: null,
        roomName: oldRoom.roomName,
        message: `${user.displayName} left the room`
      }

      newMessage(serverSocket, data)
    }

    serverSocket.io.emit('update_user_room', { user, newRoom, rooms })
  } catch (err) {
    console.log('update_user_room fail:', err)
  }
}

module.exports = { enterRoom }
