'use strict'

process.env.NODE_ENV = 'local'

const path = require('path')
const glob = require('glob')
const spawn = require('child_process').spawn
const root = path.join(__dirname, '..')
const files = glob.sync(path.join('**', '*.spec.js')).filter(name => !name.match('node_modules'))

if (files.length) {
  const args = [ '--require', 'co-mocha' ].concat(files)

  const proc = spawn(path.join('.', 'node_modules', '.bin', 'mocha'), args, {
    cwd: root,
    shell: true,
    stdio: 'inherit'
  })

  proc.on('close', code => {
    process.exit(code)
  })
}
