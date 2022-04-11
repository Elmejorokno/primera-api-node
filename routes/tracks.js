const express = require('express')
const router = express.Router()
const {
  getAllTracks,
  getTrack,
  createTrack,
  updateTrack,
  deleteTrack
} = require('../controllers/trackController')
const {
  validatorCreateTrack,
  validatorIdTrack
} = require('../validators/trackValidators')

router.get('/', getAllTracks)
router.post('/', validatorCreateTrack, createTrack)
router.get('/:idTrack', validatorIdTrack, getTrack)
router.put('/:idTrack', validatorIdTrack, validatorCreateTrack, updateTrack)
router.delete('/:idTrack', validatorIdTrack, deleteTrack)

module.exports = router
