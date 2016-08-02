'use strict'

const config = {
  local: {
    mode: 'local',
    port: 3010
  },
  staging: {
    mode: 'staging',
    port: 3011
  },
  production: {
    mode: 'production',
    port: 3012
  }
}

module.exports = function (mode) {
  return config[ mode || process.argv[ 2 ] || process.env.NODE_ENV ] || config.local
}
