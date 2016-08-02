'use strict'

const config = {
  local: {
    mode: 'local',
    port: 3000
  },
  staging: {
    mode: 'staging',
    port: 3001
  },
  production: {
    mode: 'production',
    port: 3002
  }
}

module.exports = function (mode) {
  return config[ mode || process.argv[ 2 ] || process.env.NODE_ENV ] || config.local
}
