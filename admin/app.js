'use strict'

const path = require('path')
const glob = require('glob')
const http = require('http')
const app = require('koa')()
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const mongoose = require('mongoose')
const config = require(path.join(__dirname, 'config', 'config'))()

mongoose.Promise = global.Promise
mongoose.connect(config.mongo)

let db = mongoose.connection

db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.mongo)
})

let server

if (process.env.NODE_ENV !== 'production') {
  app.use(logger())
}

app.use(bodyParser())

glob.sync(path.join(__dirname, 'route', '**', '*.js')).forEach(file => {
  app.use(require(file).routes())
})

const httpServer = http.createServer(app.callback())
module.exports = httpServer

httpServer.listen(config.port, err => {
  if (err) throw err
  server = httpServer
  console.log(`Admin ${config.mode} server is listening on port ${server.address().port}`)
})
