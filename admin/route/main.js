'use strict'

const path = require('path')
const Router = require('koa-router')
const route = module.exports = new Router()
const MainController = require(path.join('..', 'app', 'controller', 'main.controller'))()

route.get('/', MainController.getMain)
