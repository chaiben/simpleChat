const { Room } = require('../../db')
const createRoom = async (serverSocket, room) => {
  try {
    await Room.create(room)
    const rooms = await Room.findAll()
    serverSocket.io.emit('update_rooms', rooms)
  } catch (err) {
    console.log('Create room fail:', err)
  }
}

module.exports = { createRoom }
