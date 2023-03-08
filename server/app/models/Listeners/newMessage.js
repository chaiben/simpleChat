const { User, Room, Message } = require('../../db')
const newMessage = async (serverSocket, data) => {
  if (!data?.message) return false
  try {
    const { userId, roomName, message } = data
    // Recupera el usuario y el room
    const room = roomName ? await Room.findOne({ where: { roomName } }) : 0

    // Guarda el mensage
    await Message.create({
      message,
      userId,
      roomId: room.roomId
    })

    // Recupera todos los mensajes para la sala que hubo cambios
    const messages = await Message.findAll({
      where: { roomId: room.roomId },
      include: [
        {
          model: User,
          as: 'user'
        }
      ],
      order: [['createdAt', 'ASC']]
    })

    serverSocket.io.emit('update_messages', room.roomName, messages)
  } catch (err) {
    console.log('update_messages fail:', err)
  }
}

module.exports = { newMessage }
