'use strict'

const config = {
  local: {
    mode: 'local',
    port: 3020
  },
  staging: {
    mode: 'staging',
    port: 3021
  },
  production: {
    mode: 'production',
    port: 3022
  }
}

module.exports = function (mode) {
  return config[ mode || process.argv[ 2 ] || process.env.NODE_ENV ] || config.local
}
