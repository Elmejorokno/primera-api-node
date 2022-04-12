const { handleHttpError } = require('../utils/handleErrors')

/**
 * Check the role of the user and compares with the `rols`.
 * If the rol from the user matched with one element from the `rols`.
 * @param {array} rols Array of the roles authorized for the route
 * @returns
 * If matched the `rols` with the rol from the user will
 * return the next() function, another case will return an error.
 */
const checkRole = (rols) => (req, res, next) => {
  const { user } = req
  try {
    const checkValueRol = rols.some((rol) => user.role.includes(rol))

    if (!checkValueRol) {
      return handleHttpError({
        res,
        messageError: `You don't have sufficient permissions.`,
        statusCode: 401
      })
    }

    next()
  } catch (error) {
    return handleHttpError({
      res,
      messageError: 'Error checking the role. ' + error.message,
      statusCode: 400
    })
  }
}

module.exports = checkRole
