const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcryptjs')

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number },
    email: { type: String, unique: true, lowercase: true, required: true },
    password: { type: String, required: true, select: false },
    role: { type: ['user', 'admin'], default: 'user' }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

userSchema.pre('save', async function (next) {
  const user = this

  if (!user.isModified('password')) return next()

  try {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, salt)

    user.password = hash
  } catch (error) {
    throw new Error('Error hashing the password. ' + error.message)
  }
})

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('users', userSchema)
