const { Server } = require('socket.io')

module.exports = class ServerSocket {
  constructor(server) {
    ServerSocket.instance = this

    this.users = {}
    this.io = new Server(server, {
      serveClient: false,
      pingInterval: 10000,
      pingTimeout: 5000,
      cookie: false,
      cors: {
        origin: '*'
      }
    })

    this.io.on('connect', this.StartListeners)

    console.info('Soket IO started')
  }

  StartListeners = (socket) => {
    console.info('Message recieved from ' + socket.id)

    socket.on('handshake', (loggedUser, callback) => {
      console.info('Handshake recieved from ' + socket.id)

      // Check if this is a reconnection
      const reconnected = Object.values(this.users).includes(socket.id)

      if (reconnected) {
        console.info('This user has reconnected')
        const uid = this.GetUidFromSocketId(socket.id)
        const users = Object.values(this.users)

        if (uid) {
          console.info('Sending callback for reconnect ...')
          callback(uid, users)
          return
        }
      }

      // Register logged user
      const uid = JSON.stringify({
        userId: loggedUser.userId,
        userName: loggedUser.userName,
        displayName: loggedUser.displayName
      })
      this.users[uid] = socket.id
      const users = Object.values(this.users)
      console.info('Sending callback for handshake ...')
      callback(uid, users)

      // Send new user to all connected users
      this.SendMessage(
        'user_connected',
        users.filter((id) => id !== socket.id),
        users
      )
    })

    socket.on('disconnect', () => {
      console.info('Disconnected recieved from ' + socket.id)

      const uid = this.GetUidFromSocketId(socket.id)

      if (uid) {
        delete this.users[uid]
        const users = Object.values(this.users)
        this.SendMessage('user_disconnected', users, socket.id)
      }
    })
  }

  GetUidFromSocketId = (id) =>
    Object.keys(this.users).find((uid) => this.users[uid] === id)

  /**
   * Send a message though the socket
   * @param {*} name The ename of the event, ex: handshake
   * @param {*} users List of socket id's
   * @param {*} payload any information needed by the user for state updates
   */
  SendMessage = (name, users, payload) => {
    console.info(`Emmitting event: ${name} to `, users)
    users.forEach((id) => {
      payload ? this.io.to(id).emit(name, payload) : this.io.to(id).emit(name)
    })
  }
}
