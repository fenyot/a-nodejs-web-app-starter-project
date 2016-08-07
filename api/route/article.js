'use strict'

const path = require('path')
const Router = require('koa-router')
const route = module.exports = new Router({ prefix: '/article' })
const Article = require(path.join('..', '..', 'common', 'model', 'article.model'))
const ArticleController = require(path.join('..', 'app', 'controller', 'article.controller'))(Article)

route.get('/:id?', ArticleController.getArticle)

route.post('/', ArticleController.postArticle)

route.put('/:id', ArticleController.updateArticle)

route.delete('/:id', ArticleController.deleteArticle)
