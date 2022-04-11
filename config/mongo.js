const mongoose = require('mongoose')

const dbConnect = () => {
  const URI = process.env.URI
  mongoose.connect(
    URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, res) => {
      if (err) {
        console.log('DB CONNECTION ERROR: ' + err)
        return
      }

      console.log('DB CONNECTED ✨')
    }
  )
}

module.exports = dbConnect
