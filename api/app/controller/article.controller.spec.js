/* eslint-env mocha */
'use strict'

const path = require('path')
const sinon = require('sinon')
const expect = require('chai').expect
const JsonSchema = require('jsonschema')
const Model = require(path.join('..', '..', '..', 'common', 'model', 'article.model'))
const Controller = require(path.join(__dirname, 'article.controller'))(Model, JsonSchema)

let getRequest
let records
let postRequest
let postResponse
let putResponse
let deleteResponse

beforeEach(function * () {
  getRequest = {
    params: {
      id: undefined
    }
  }

  records = [ {
    _id: '57a798d34c4a38f7359b0940',
    title: 'An article title from testing',
    content: 'An article content from testing'
  }, {
    _id: '5818a9a979904f574d9ad9f8',
    title: 'Another article title from testing',
    content: 'Another article content from testing'
  } ]

  postRequest = {
    params: {
      id: '57a798d34c4a38f7359b0940'
    },
    request: {
      body: {
        title: 'An article title from testing',
        content: 'An article content from testing'
      }
    }
  }

  postResponse = {
    success: true,
    article: {
      title: 'An article title from testing',
      content: 'An article content from testing',
      created: '2016-11-05T11:36:59.553Z'
    }
  }

  putResponse = {
    success: true,
    article: {
      ok: 1,
      nModified: 1,
      n: 1
    }
  }

  deleteResponse = {
    success: true,
    article: {
      ok: 1,
      n: 1
    }
  }
})

describe('ArticleController', function () {
  describe('get articles', function () {
    it('should call find once', function * () {
      let find = sinon.spy(Model, 'find')

      yield Controller.getArticle.call(getRequest)

      find.restore()

      sinon.assert.calledOnce(find)
    })

    it('should return all the articles', function * () {
      let mock = sinon.mock(Model)

      mock
        .expects('find')
        .withExactArgs(null)
        .returns(records)

      let res = yield Controller.getArticle.call(getRequest)
      expect(res).to.eql({ success: true, records: records })

      mock.verify()
      mock.restore()
    })

    it('should return an article by id', function * () {
      let request = getRequest
      request.params.id = records[ 0 ][ '_id' ]

      let mock = sinon.mock(Model)

      mock
        .expects('find')
        .withExactArgs({ _id: request.params.id })
        .returns([ records[ 0 ] ])

      let res = yield Controller.getArticle.call(request)
      expect(res).to.eql({ success: true, records: [ records[ 0 ] ] })

      mock.verify()
      mock.restore()
    })
  })

  describe('article post', function () {
    it('should validate the JSON object', function * () {
      let save = sinon.stub(Model.prototype, 'save')

      save
        .yields()

      let validate = sinon.spy(JsonSchema.Validator.prototype, 'validate')

      yield Controller.postArticle.call(postRequest)

      save.restore()
      validate.restore()
      sinon.assert.calledOnce(validate)
    })

    it('should call save only once', function * () {
      let save = sinon.stub(Model.prototype, 'save')

      save
        .yields()

      yield Controller.postArticle.call(postRequest)

      save.restore()
      sinon.assert.calledOnce(save)
    })

    it('should return the new record object', function * () {
      function Model () {}

      Model.prototype.save = function () {}

      let mock = sinon.mock(Model.prototype)

      mock
        .expects('save')
        .returns(postResponse.article)

      let c = require(path.join(__dirname, 'article.controller'))(Model, JsonSchema)

      let res = yield c.postArticle.call(postRequest)

      expect(res).to.eql(postResponse)

      mock.verify()
      mock.restore()
    })
  })

  describe('article update', function () {
    it('should validate the JSON object', function * () {
      let save = sinon.stub(Model.prototype, 'save')

      save
        .yields()

      let validate = sinon.spy(JsonSchema.Validator.prototype, 'validate')

      yield Controller.updateArticle.call(postRequest)

      save.restore()
      validate.restore()
      sinon.assert.calledOnce(validate)
    })

    it('should call update only once', function * () {
      let update = sinon.stub(Model, 'update')

      update
        .yields()

      yield Controller.updateArticle.call(postRequest)

      update.restore()
      sinon.assert.calledOnce(update)
    })

    it('should return the updated record object', function * () {
      let mock = sinon.mock(Model)

      mock
        .expects('update')
        .withExactArgs({ _id: postRequest.params.id }, { $set: postRequest.request.body })
        .returns(putResponse.article)

      let res = yield Controller.updateArticle.call(postRequest)

      expect(res).to.eql(putResponse)

      mock.verify()
      mock.restore()
    })

    it('should return error object if the article is not updated')
  })

  describe('delete an article', function () {
    it('should call remove only once', function * () {
      let update = sinon.stub(Model, 'remove')

      update
        .yields()

      yield Controller.deleteArticle.call({ params: { id: '57a798d34c4a38f7359b0940' } })

      update.restore()
      sinon.assert.calledOnce(update)
    })

    it('should delete an article by id', function * () {
      let mock = sinon.mock(Model)

      mock
        .expects('remove')
        .withExactArgs({ _id: '57a798d34c4a38f7359b0940' })
        .returns(deleteResponse.article)

      let res = yield Controller.deleteArticle.call({ params: { id: '57a798d34c4a38f7359b0940' } })

      expect(res).to.eql(deleteResponse)

      mock.verify()
      mock.restore()
    })

    it('should return error object if delete is failed')
  })
})
