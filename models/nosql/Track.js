const mongoose = require('mongoose')
const { Schema } = mongoose

const trackSchema = new Schema(
  {
    name: { type: String, required: true },
    album: { type: String, required: true },
    cover: {
      type: String,
      validate: {
        validator: (req) => true,
        message: 'ERROR_URL'
      },
      required: true
    },
    artist: {
      name: { type: String },
      nickname: { type: String, required: true },
      nationality: { type: String }
    },
    duration: {
      start: { type: Number, default: 0 },
      end: { type: Number, required: true }
    },
    mediaId: {
      type: mongoose.Types.ObjectId,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = mongoose.model('tracks', trackSchema)
