const { check } = require('express-validator')
const checkValidator = require('../middlewares/checkValidator')

/**
 * Validate the `name`, `age`, `email`, `password` and `role` from the registered user.
 */
const validatorRegisterUser = [
  check('name').notEmpty().trim().isLength({ min: 2, max: 60 }).escape(),
  check('age')
    .notEmpty()
    .trim()
    .isNumeric()
    .custom((value) => {
      if (!(value >= 13 && value <= 100))
        throw new Error('Invalid age range. Enter an age between 13 - 100.')

      return value
    })
    .escape(),
  check('email').notEmpty().trim().isEmail().normalizeEmail().escape(),
  check('password').notEmpty().trim().isLength({ min: 8, max: 12 }).escape(),
  check('role')
    .notEmpty()
    .trim()
    .toLowerCase()
    .escape()
    .custom((value) => {
      if (value === 'user' || value === 'admin') return value

      throw new Error(`The role must be 'user' or 'admin'`)
    }),
  (req, res, next) => checkValidator(req, res, next)
]

/**
 * Validate the fields `email` and `password` from the login user.
 */
const validatorLoginUser = [
  check('email').notEmpty().trim().isEmail().normalizeEmail().escape(),
  check('password').notEmpty().trim().isLength({ min: 8, max: 12 }).escape(),
  (req, res, next) => checkValidator(req, res, next)
]

module.exports = { validatorRegisterUser, validatorLoginUser }
