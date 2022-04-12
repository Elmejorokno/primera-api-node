const { check } = require('express-validator')
const checkValidator = require('../middlewares/checkValidator')

/**
 * Validate the `idStorage` provided in the url params.
 */
const validatorIdStorage = [
  check('idStorage').trim().isMongoId().escape(),
  (req, res, next) => checkValidator(req, res, next)
]

module.exports = { validatorIdStorage }
