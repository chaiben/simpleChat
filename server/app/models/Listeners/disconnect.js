const { enterRoom } = require('./enterRoom')

const disconnect = async (serverSocket, socket) => {
  console.info('Disconnected recieved from ' + socket.id)

  const uid = serverSocket.GetUidFromSocketId(socket.id)

  if (uid) {
    const user = JSON.parse(uid)
    enterRoom(serverSocket, user.userId, 0)

    // Borra el usuario de la lista de users
    delete serverSocket.users[uid]
    const users = Object.values(serverSocket.users)

    serverSocket.SendMessage('user_disconnected', users, socket.id)
  }
}

module.exports = { disconnect }
