'use strict'

module.exports = function (port) {
  return {
    local: {
      mode: 'local',
      port: port,
      mongo: 'mongodb://127.0.0.1/web-app-local'
    },
    testing: {
      mode: 'testing',
      port: port,
      mongo: 'mongodb://127.0.0.1/web-app-testing'
    },
    staging: {
      mode: 'staging',
      port: port,
      mongo: 'mongodb://127.0.0.1/web-app-staging'
    },
    production: {
      mode: 'production',
      port: port,
      mongo: 'mongodb://127.0.0.1/web-app-production'
    }
  }
}
