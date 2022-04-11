const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number },
    email: { type: String, unique: true, lowercase: true, required: true },
    password: { type: String, required: true },
    role: { type: ['user', 'admin'], default: 'user' }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = mongoose.model('users', userSchema)
