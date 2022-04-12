const { validationResult } = require('express-validator')
const { handleHttpError } = require('../utils/handleErrors')

/**
 * Middleware that check if the validator from express-validator don't have any error.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 * If there is no one error will return the next() function,
 * another case will return the error from the validator.
 */
const checkValidator = (req, res, next) => {
  try {
    validationResult(req).throw()
    return next()
  } catch (error) {
    return handleHttpError({
      res,
      messageError: error.array(),
      statusCode: 403
    })
  }
}

module.exports = checkValidator
