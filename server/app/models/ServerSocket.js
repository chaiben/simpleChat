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

    socket.on('handshack', () => {
      console.info('Handshake recieved from ' + socket.id)
    })

    socket.on('disconnect', () => {
      console.info('Disconnected recieved from ' + socket.id)
    })
  }
}
