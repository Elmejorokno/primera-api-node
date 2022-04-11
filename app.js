const express = require('express')
const cors = require('cors')
require('dotenv').config()

const dbConnect = require('./config/mongo')

const app = express()

app.use(cors())
app.use(express.json({ extended: true }))
app.use(express.static('storage'))

app.use('/api', require('./routes/index'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT + ' 🚀')
  dbConnect()
})
