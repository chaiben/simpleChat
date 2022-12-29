const express = require('express')
const bodyParser = require('body-parser')
const apiRouter = require('./routes/route')

const app = express()

require('./db')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', apiRouter)

app.listen(3000)
