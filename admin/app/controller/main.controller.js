'use strict'

module.exports = function () {
  return {
    getMain: function * () {
      yield this.render('index', {
        title: 'Admin panel',
        name: 'Admin'
      })
    }
  }
}
