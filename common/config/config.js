'use strict'

module.exports = function (port) {
  return {
    local: {
      mode: 'local',
      port: port,
      mongo: 'mongodb://127.0.0.1/web-app-local'
    },
    test: {
      mode: 'test',
      port: port,
      mongo: 'mongodb://127.0.0.1/web-app-test'
    },
    staging: {
      mode: 'staging',
      port: port,
      mongo: 'mongodb://127.0.0.1/web-app-staging'
    },
    production: {
      mode: 'production',
      port: port,
      mongo: 'mongodb://127.0.0.2/web-app-production'
    }
  }
}
