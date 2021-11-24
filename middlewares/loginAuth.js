const usersModel = require('../models/users')()
const bcrypt = require('bcryptjs')
module.exports = async function loginAuth (req, res, next) {
  const payload = req.body
  const data = {
    email: payload.email,
    password: payload.password
  }
  let statusCode = 500
  try {
    if (!data.email) {
      statusCode = 400
      throw new Error('Email cannot be empty')
    }
    const checkEmail = await usersModel.findOne({ email: data.email })
    if (!checkEmail) {
      statusCode = 404
      throw new Error('Email is not exist')
    }

    const isPasswordMatch = await bcrypt.compare(
      data.password,
      checkEmail.password
    )
    if (!isPasswordMatch) {
      statusCode = 400
      throw new Error('invalid password')
    }
    next()
  } catch (error) {
    console.log(error)
    res
      .status(statusCode)
      .json({ message: error.message, code: statusCode, success: false })
  }
}
