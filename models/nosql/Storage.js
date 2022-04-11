const mongoose = require('mongoose')

const { Schema } = mongoose

const storageSchema = new Schema(
  {
    filename: { type: String, required: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = mongoose.model('storages', storageSchema)
