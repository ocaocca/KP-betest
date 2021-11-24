const router = require('express').Router()

const usersController = require('../controllers/users')
const scoreController = require('../controllers/score')

module.exports = function routes () {
  router.use('/api/users', usersController)

  router.use('/api/score', scoreController)

  return router
}
