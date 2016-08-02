'use strict'

const path = require('path')
const glob = require('glob')
const http = require('http')
const app = require('koa')()
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const conf = require('./config/config')()

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

httpServer.listen(conf.port, err => {
  if (err) throw err
  server = httpServer
  console.log(`Api ${conf.mode} server is listening on port ${server.address().port}`)
})
