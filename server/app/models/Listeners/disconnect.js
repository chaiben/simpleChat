const { UserRoom } = require('../../db')

const disconnect = async (serverSocket, socket) => {
  console.info('Disconnected recieved from ' + socket.id)

  const uid = serverSocket.GetUidFromSocketId(socket.id)

  if (uid) {
    const user = JSON.parse(uid)
    // Borra los registros de los rooms
    await UserRoom.destroy({ where: { userId: user.userId } })

    // Borra el usuario de la lista de users
    delete serverSocket.users[uid]
    const users = Object.values(serverSocket.users)

    serverSocket.SendMessage('user_disconnected', users, socket.id)
  }
}

module.exports = { disconnect }
