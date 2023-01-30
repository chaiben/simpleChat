const { Server } = require('socket.io')
const { disconnect } = require('./Listeners/disconnect')
const { handshake } = require('./Listeners/handshake')

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
      handshake(this, socket, loggedUser, callback)
    })

    socket.on('disconnect', () => {
      disconnect(this, socket)
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
