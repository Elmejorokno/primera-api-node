const { matchedData } = require('express-validator')
const User = require('../models/nosql/User')
const { handleHttpError } = require('../utils/handleErrors')
const { signToken } = require('../utils/handleJwt')

/**
 * Register a new user to the db.
 * @param {*} req
 * @param {*} res
 * @returns
 * Info from the new user.
 */
const registerUser = async (req, res) => {
  const body = matchedData(req)
  try {
    const user = await User.create(body)
    //don't appear the field password on the response.
    user.set('password', undefined, { strict: false })
    signToken(user)
    return res.status(201).json({ user })
  } catch (error) {
    return handleHttpError({
      res,
      messageError: 'Error registering user. ' + error.message,
      statusCode: 400
    })
  }
}

/**
 * Login a new user. Check the credentials with the db.
 * Select the credentials from the body
 * @param {*} req
 * @param {*} res
 * @returns
 * Info from ther user logged.
 */
const loginUser = async (req, res) => {
  const body = matchedData(req)
  try {
    const user = await User.findOne({ email: body.email }).select(
      'age email password role createdAt updatedAt'
    )
    if (!user) throw new Error(`The user doesn't exists.`)

    if (!(await user.comparePassword(body.password)))
      throw new Error(`Invalid password.`)

    user.set('password', undefined, { strict: false })

    console.log(signToken(user))

    return res.json(user)
  } catch (error) {
    return handleHttpError({
      res,
      messageError: 'Error login the user. ' + error.message,
      statusCode: error.message !== 'Invalid password.' ? 400 : 401
    })
  }
}

module.exports = {
  registerUser,
  loginUser
}
