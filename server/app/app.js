const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const apiRouter = require('./routes/route')
const cors = require('cors')
const http = require('http')
const ServerSocket = require('./models/ServerSocket')

// Create express application
const app = express()

// Server handling
const httpServer = http.createServer(app)

// Start the Socket
new ServerSocket(httpServer)

// Cors for express server
app.use(cors())

require('./db')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', apiRouter)

httpServer.listen(process.env.SERVER_PORT, () =>
  console.log('Server is running')
)
