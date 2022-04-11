const express = require('express')
const router = express.Router()
const {
  getAllStorages,
  createStorage,
  getStorage,
  deleteStorage
} = require('../controllers/storageController')
const checkUploadFile = require('../middlewares/checkUploadFile')
const { validatorIdStorage } = require('../validators/storageValidators')

router.get('/', getAllStorages)
router.post('/', checkUploadFile.single('myfile'), createStorage)
router.get('/:idStorage', validatorIdStorage, getStorage)
router.delete('/:idStorage', validatorIdStorage, deleteStorage)

module.exports = router
