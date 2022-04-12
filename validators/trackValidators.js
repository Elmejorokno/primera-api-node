const { check } = require('express-validator')
const checkValidator = require('../middlewares/checkValidator')

/**
 * Validate the fields `name`, `album`, `cover`, `artist.name`, `artist.nickname`,
 * `artist.nationality`, `duration.start`, `duration.end` and `mediaId`
 * from the created track.
 */
const validatorCreateTrack = [
  check('name').notEmpty().trim().isLength({ min: 2, max: 60 }).escape(),
  check('album').notEmpty().trim().isLength({ min: 2, max: 60 }).escape(),
  check('cover').notEmpty().trim().isURL(),
  check('artist.name').trim().escape(),
  check('artist.nickname')
    .notEmpty()
    .trim()
    .isLength({ min: 2, max: 60 })
    .escape(),
  check('artist.nationality').trim().escape(),
  check('duration.start').notEmpty().trim().isNumeric().escape(),
  check('duration.end').notEmpty().trim().escape().isNumeric().escape(),
  check('mediaId').notEmpty().trim().isMongoId().escape(),
  (req, res, next) => checkValidatorTrack(req, res, next)
]

/**
 * Validate the `idTrack` provided in the url params.
 */
const validatorIdTrack = [
  check('idTrack').trim().isMongoId().escape(),
  (req, res, next) => checkValidator(req, res, next)
]

module.exports = { validatorCreateTrack, validatorIdTrack }
