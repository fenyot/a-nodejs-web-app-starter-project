'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArticleSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  created: { type: Date, default: Date.now }
})

ArticleSchema.pre('save', function (next) {
  next()
})

const ArticleModel = mongoose.model('Article', ArticleSchema)

module.exports = ArticleModel
