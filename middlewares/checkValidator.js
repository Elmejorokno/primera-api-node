const { validationResult } = require('express-validator')
const { handleHttpError } = require('../utils/handleErrors')

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
