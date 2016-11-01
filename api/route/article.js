'use strict'

const path = require('path')
const Router = require('koa-router')
const route = module.exports = new Router({ prefix: '/article' })
const JsonSchema = require('jsonschema')
const Model = require(path.join('..', '..', 'common', 'model', 'article.model'))
const Controller = require(path.join('..', 'app', 'controller', 'article.controller'))(Model, JsonSchema)

route
  .get('/:id?', Controller.getArticle)
  .post('/', Controller.postArticle)
  .put('/:id', Controller.updateArticle)
  .delete('/:id', Controller.deleteArticle)
