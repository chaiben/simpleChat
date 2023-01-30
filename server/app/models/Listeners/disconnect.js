const disconnect = (serverSocket, socket) => {
  console.info('Disconnected recieved from ' + socket.id)

  const uid = serverSocket.GetUidFromSocketId(socket.id)

  if (uid) {
    delete serverSocket.users[uid]
    const users = Object.values(serverSocket.users)
    serverSocket.SendMessage('user_disconnected', users, socket.id)
  }
}

module.exports = { disconnect }
