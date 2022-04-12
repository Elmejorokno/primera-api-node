const express = require('express')
const router = express.Router()
const {
  getAllTracks,
  getTrack,
  createTrack,
  updateTrack,
  deleteTrack
} = require('../controllers/trackController')
const checkRole = require('../middlewares/checkRole')
const checkSession = require('../middlewares/checkSession')
const {
  validatorCreateTrack,
  validatorIdTrack
} = require('../validators/trackValidators')

router.get('/', checkSession, checkRole(['admin']), getAllTracks)
router.post('/', checkSession, validatorCreateTrack, createTrack)
router.get('/:idTrack', checkSession, validatorIdTrack, getTrack)
router.put(
  '/:idTrack',
  checkSession,
  validatorIdTrack,
  validatorCreateTrack,
  updateTrack
)
router.delete('/:idTrack', checkSession, validatorIdTrack, deleteTrack)

module.exports = router
