const User = require('../models/nosql/User')
const { handleHttpError } = require('../utils/handleErrors')
const { verifyToken } = require('../utils/handleJwt')

/**
 * Middleware that check the session of the user.
 * Save data from the user in req.user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 * If exists the jwt from the user and it's valid will
 * return the next() function, another case will return an error.
 */
const checkSession = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new Error(`The token doesn't exists.`)

    const token = req.headers.authorization.split(' ').pop()

    const dataToken = verifyToken(token)

    const user = await User.findById(dataToken.id).select('name email role')

    req.user = user

    if (!dataToken.id) throw new Error('Wrong data token.')

    next()
  } catch (error) {
    return handleHttpError({
      res,
      messageError: 'Error checking session of the user. ' + error.message,
      statusCode: 401
    })
  }
}

module.exports = checkSession
