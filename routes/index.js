const express = require('express')
const fs = require('fs')
const router = express.Router()

const removeExtension = (filename) => {
  return filename.split('.')[0]
}

//automatize all routes from the subconjunt '/api'
// it's focused in only this file and don't in anothers.
fs.readdirSync(__dirname).filter((file) => {
  const name = removeExtension(file)
  if (name === 'index') return

  router.use(`/${name}`, require(`./${file}`))
})

module.exports = router
