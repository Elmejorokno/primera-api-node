const express = require('express')
const { registerUser, loginUser } = require('../controllers/authController')
const {
  validatorRegisterUser,
  validatorLoginUser
} = require('../validators/authValidators')
const router = express.Router()

router.post('/register', validatorRegisterUser, registerUser)
router.post('/login', validatorLoginUser, loginUser)

module.exports = router
