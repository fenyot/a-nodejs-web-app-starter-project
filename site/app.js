'use strict'

const path = require('path')
const glob = require('glob')
const http = require('http')
const app = require('koa')()
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const config = require(path.join(__dirname, 'config', 'config'))()

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
  console.log(`Site ${config.mode} server is listening on port ${server.address().port}`)
})
