/* eslint-env mocha */
'use strict'

const path = require('path')
const mocha = require('mocha')
const coMocha = require('co-mocha')
const expect = require('chai').expect

coMocha(mocha)

describe('Admin MainController', function () {
  it('should have getMain() method', function * () {
    let MainController = require(path.join(__dirname, 'main.controller'))()
    expect(MainController).to.have.property('getMain').that.is.a('function')
  })
})
