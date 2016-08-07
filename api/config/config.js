'use strict'

const port = process.env.PORT || 3000
const path = require('path')
const config = require(path.join('..', '..', 'common', 'config', 'config'))(port)

module.exports = function (mode) {
  return config[ mode || process.env.NODE_ENV ] || config.local
}
