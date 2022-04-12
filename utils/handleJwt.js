const jwt = require('jsonwebtoken')

/**
 * Create and sign a JWT with the id and role from the user.
 * @param {object} user object with the properties from the user
 * @returns The JWT token with sign and expiration date in 6h.
 */
const signToken = ({ _id, role }) => {
  return jwt.sign({ id: _id, role }, process.env.JWT_SECRET, {
    expiresIn: '6h'
  })
}

/**
 * Verify that the token is signed with the secret.
 * @param {string} tokenJwt Is the JsonWebToken string.
 * @returns
 * The decoded token.
 */
const verifyToken = (tokenJwt) => {
  try {
    return jwt.verify(tokenJwt, process.env.JWT_SECRET)
  } catch (error) {
    throw new Error('Error verifying the token. ' + error.message)
  }
}

module.exports = {
  signToken,
  verifyToken
}
