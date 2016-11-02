'use strict'

const path = require('path')
const glob = require('glob')
const fs = require('fs')

module.exports = function (Article, JsonSchema) {
  let validator = new JsonSchema.Validator()

  glob
    .sync(path.join('api', 'resource', 'json_schema', 'article', '*.schema.json'))
    .forEach(file => {
      let schema = JSON.parse(fs.readFileSync(file, 'utf8'))
      validator.addSchema(schema, schema.id)
    })

  return {
    getArticle: function * () {
      try {
        let options = this.params.id ? { _id: this.params.id } : null

        this.body = {
          success: true,
          records: yield Article.find(options)
        }
      } catch (e) {
        this.body = {
          success: false,
          error: e.message
        }
      }

      return this.body
    },

    postArticle: function * () {
      try {
        let schema = validator.getSchema('/article_post')

        validator.validate(this.request.body, schema)

        let article = new Article(this.request.body)

        this.body = {
          success: true,
          article: yield article.save()
        }
      } catch (e) {
        this.body = {
          success: false,
          error: e.message
        }
      }

      return this.body
    },

    updateArticle: function * () {
      try {
        this.body = {
          success: true,
          article: yield Article.update({ _id: this.params.id }, { $set: this.request.body })
        }
      } catch (e) {
        this.body = {
          success: false,
          error: e.message
        }
      }

      return this.body
    },

    deleteArticle: function * () {
      try {
        this.body = {
          success: true,
          article: yield Article.remove({ _id: this.params.id })
        }
      } catch (e) {
        this.body = {
          success: false,
          error: e.message
        }
      }

      return this.body
    }
  }
}
