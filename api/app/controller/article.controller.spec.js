/* eslint-env mocha */
'use strict'

const path = require('path')
const sinon = require('sinon')
const JsonSchema = require('jsonschema')
const Model = require(path.join('..', '..', '..', 'common', 'model', 'article.model'))
const Controller = require(path.join(__dirname, 'article.controller'))(Model, JsonSchema)

const data = {
  request: {
    body: {
      title: 'An article from testing',
      content: 'An article from testing'
    }
  }
}

require('co-supertest')(require('..'))

describe('ArticleController', function () {
  describe('Get all the articles', function () {
    it('should call find once', function * () {
      let obj = {
        params: {
          id: undefined
        }
      }

      let find = sinon.spy(Model, 'find')
      let getArticle = sinon.spy(Controller, 'getArticle')

      yield Controller.getArticle.call(obj)

      getArticle.restore()
      find.restore()

      sinon.assert.calledOnce(getArticle)
      sinon.assert.calledOnce(find)
    })
  })

  describe('Article post', function () {
    it('should validate the JSON object', function * () {
      let save = sinon.stub(Model.prototype, 'save')
      save.yields()

      let validate = sinon.spy(JsonSchema.Validator.prototype, 'validate')

      yield Controller.postArticle.call(data)

      save.restore()
      validate.restore()
      sinon.assert.calledOnce(validate)
    })

    it('should call save only once', function * () {
      let save = sinon.stub(Model.prototype, 'save')
      save.yields()

      yield Controller.postArticle.call(data)

      save.restore()
      sinon.assert.calledOnce(save)
    })
  })

  describe('Article update', function () {
    it('should validate the JSON object')
    it('should call save only once')
  })

  describe('Delete an article', function () {
    it('should delete an article by specified id')
  })
})
