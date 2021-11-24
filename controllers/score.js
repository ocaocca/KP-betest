require('dotenv').config()
const control = require('express').Router()

module.exports = function usersController () {
  control.get('/get', async (req, res) => {
    console.log('hello you')
  })
}
