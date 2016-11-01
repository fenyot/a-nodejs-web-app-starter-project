/* eslint-env mocha */
'use strict'

const agent = require('co-supertest')(require('..'))
const expect = require('chai').expect

let article

describe('Article API integration testing', function () {
  describe('article post', () => {
    it('should return error object if the article is not saved', function * () {
      let params = {
        title: 'An article from testing'
      }

      let response = yield agent.post('/article').send(params).expect(200).end()
      expect(response.body).to.have.property('success', false)
      expect(response.body).to.have.property('error').that.is.a('string')
    })

    it('should return success object with created record if the article was saved', function * () {
      let params = {
        title: 'An article from testing',
        content: 'An article from testing'
      }

      article = yield agent.post('/article').send(params).expect(200).end()
      expect(article.body).to.have.property('success', true)
      expect(article.body).to.have.property('article').that.is.an('object')
    })
  })

  describe('article get', () => {
    it('should return an article by id', function * () {
      let response = yield agent.get('/article/' + article.body.article._id).expect(200).end()
      expect(response.body).to.have.property('success', true)
    })
  })

  describe('article update', () => {
    it('should return error object if the article is not updated')

    it('should return success object with updated record if the article was updated', function * () {
      let params = {
        title: 'Updated article from testing'
      }

      let response = yield agent.put('/article/' + article.body.article._id).send(params).expect(200).end()
      expect(response.body).to.have.property('success', true)
      expect(response.body).to.have.property('article').that.is.an('object')
      expect(response.body.article.ok).to.equal(1)
      expect(response.body.article.n).to.equal(1)
    })
  })

  describe('article delete', () => {
    it('should return error object if delete is failed')

    it('should delete an article by id', function * () {
      let response = yield agent.delete('/article/' + article.body.article._id).send().expect(200).end()
      expect(response.body).to.have.property('success', true)
      expect(response.body).to.have.property('article').that.is.an('object')
      expect(response.body.article.ok).to.equal(1)
      expect(response.body.article.n).to.equal(1)
    })
  })
})
