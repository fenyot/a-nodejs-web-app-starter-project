/* eslint-env mocha */
'use strict'

const path = require('path')
const expect = require('chai').expect

describe('Admin configuration setup', () => {
  it('should load local configurations', (done) => {
    let config = require(path.join('..', 'config', 'config'))('local')

    expect(config).to.have.property('mode').that.is.equal('local')
    expect(config).to.have.property('port').that.is.a('number')
    expect(config).to.have.property('mongo').that.is.a('string')

    done()
  })

  it('should load testing configurations', (done) => {
    let config = require(path.join('..', 'config', 'config'))('testing')

    expect(config).to.have.property('mode').that.is.equal('testing')
    expect(config).to.have.property('port').that.is.a('number')
    expect(config).to.have.property('mongo').that.is.a('string')

    done()
  })

  it('should load staging configurations', (done) => {
    let config = require(path.join('..', 'config', 'config'))('staging')

    expect(config).to.have.property('mode').that.is.equal('staging')
    expect(config).to.have.property('port').that.is.a('number')
    expect(config).to.have.property('mongo').that.is.a('string')

    done()
  })

  it('should load production configurations', (done) => {
    let config = require(path.join('..', 'config', 'config'))('production')

    expect(config).to.have.property('mode').that.is.equal('production')
    expect(config).to.have.property('port').that.is.a('number')
    expect(config).to.have.property('mongo').that.is.a('string')

    done()
  })
})
