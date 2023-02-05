const { Server } = require('socket.io')
const {
  disconnect,
  handshake,
  createRoom,
  enterRoom,
  newMessage
} = require('./listeners/')

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

    socket.on('create_room', (roomName) => {
      createRoom(this, roomName)
    })

    socket.on('enter_room', (userId, roomName) => {
      enterRoom(this, userId, roomName)
    })

    socket.on('new_message', (data) => {
      newMessage(this, data)
    })
  }

  GetUidFromSocketId = (id) =>
    Object.keys(this.users).find((uid) => this.users[uid] === id)

  /**
   * Send a message though the socket
   * @param {*} name The ename of the event, ex: handshake
   * @param {*} users List of socket id's
   * @param {*} payload any information needed
   */
  SendMessage = (event, users, payload) => {
    console.info(`Emmitting event: ${event} to `, users)
    users.forEach((id) => {
      payload ? this.io.to(id).emit(event, payload) : this.io.to(id).emit(event)
    })
  }
}
