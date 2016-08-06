'use strict'

const path = require('path')
const glob = require('glob')
const http = require('http')
const app = require('koa')()
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const mongoose = require('mongoose')
const config = require(path.join(__dirname, 'config', 'config'))()
const isModule = require.main !== module

mongoose.Promise = global.Promise
mongoose.connect(config.mongo)

let db = mongoose.connection

db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.mongo)
})

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  app.use(logger())
}

app.use(bodyParser())

glob.sync(path.join(__dirname, 'route', '**', '*.js')).forEach(file => {
  app.use(require(file).routes())
})

const server = http.createServer(app.callback())

module.exports = server

if (!isModule) {
  server.listen(config.port, err => {
    if (err) throw err
    console.log(`Admin ${config.mode} server is listening on port ${server.address().port}`)
  })
}
