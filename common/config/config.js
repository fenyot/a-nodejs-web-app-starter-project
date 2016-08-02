'use strict'

module.exports = function (port) {
  return {
    local: {
      mode: 'local',
      port: port
    },
    staging: {
      mode: 'staging',
      port: port
    },
    production: {
      mode: 'production',
      port: port
    }
  }
}
