const mongoose = require('mongoose')
const Schema = mongoose.Schema
const usersSchema = new Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: Number, default: 0 }, // 0=student, 1=teacher, 2=admin
  verify: { type: Number, default: 0 },
  salt: String,
  image: { type: String, required: false, default: null },
  createdAt: { type: Date },
  updatedAt: { type: Date }
})
module.exports = function usersModel () {
  return mongoose.model('users', usersSchema)
}
