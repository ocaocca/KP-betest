const control = require('express').Router()
const usersModel = require('../models/users')()
const loginAuth = require('../middlewares/loginAuth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

require('dotenv').config()

module.exports = function usersController () {
  control.post('/register', async (req, res) => {
    let statusCode = 500
    try {
      const payload = req.body
      const password = payload.password
      const status = req.query.status
      const saltKey = await bcrypt.genSalt(10)
      const hashpassword = await bcrypt.hash(password, saltKey)
      const data = {
        fullname: payload.fullname,
        email: payload.email,
        password: hashpassword,
        salt: saltKey,
        status: status,
        createdAt: Date.now()
      }
      const result = await usersModel.create(data)
      if (status === 1) {
        statusCode = 201
        res
          .status(statusCode)
          .json({
            message: 'success registered as teacher',
            code: statusCode,
            success: true,
            result: result
          })
      } else {
        statusCode = 201
        res
          .status(statusCode)
          .json({
            message: 'success registered as student',
            code: statusCode,
            success: true,
            result: result
          })
      }
    } catch (error) {
      console.log(error)
      statusCode = 400
      res
        .status(statusCode)
        .json({ message: error.message, code: statusCode, success: false })
    }
  })

  control.post('/login', loginAuth, async (req, res) => {
    let statusCode = 500
    try {
      const payload = req.body
      const email = payload.email
      const userExist = await usersModel.findOne({ email: email })
      const token = await jwt.sign(userExist.toJSON(), process.env.SALT_KEY)
      statusCode = 200
      res
        .status(statusCode)
        .json({
          message: 'success',
          code: statusCode,
          success: true,
          token: token
        })
    } catch (error) {
      console.log(error)
      statusCode = 400
      res
        .status(statusCode)
        .json({ message: error.message, code: statusCode, success: false })
    }
  })
}
