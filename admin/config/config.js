'use strict'

const port = process.env.PORT || 3001
const path = require('path')
const config = require(path.join('..', '..', 'common', 'config', 'config'))(port)

module.exports = function (mode) {
  return config[ mode || process.argv[ 2 ] || process.env.NODE_ENV ] || config.local
}
