const fs = require('fs')
const { matchedData } = require('express-validator')
const Storage = require('../models/nosql/Storage')
const { handleHttpError } = require('../utils/handleErrors')

/**
 * Get all the storages data from the db
 * @param {*} req
 * @param {*} res
 * @returns
 * Data from the storages.
 */
const getAllStorages = async (req, res) => {
  try {
    const storages = await Storage.find()
    return res.status(200).json(storages)
  } catch (error) {
    return handleHttpError({
      res,
      messageError: 'Error getting all storages. ' + error.message,
      statusCode: 400
    })
  }
}

/**
 * Get just one storage from the db.
 * Select the storage with an id provided on the url params.
 * @param {*} req
 * @param {*} res
 * @returns
 * The storage data from the db.
 */
const getStorage = async (req, res) => {
  const { idStorage } = matchedData(req)
  try {
    const storage = await Storage.findById(idStorage)

    if (!storage) throw new Error(`Doesn't exists the storage.`)

    return res.status(200).json(storage)
  } catch (error) {
    return handleHttpError({
      res,
      messageError: 'Error getting the storage. ' + error.message,
      statusCode: 400
    })
  }
}

/**
 * Upload name's file that upload to the server with multer on the db
 * @param {*} req
 * @param {*} res
 * @returns
 * The new storage data created on the db.
 */
const createStorage = async (req, res) => {
  const { file } = req
  try {
    const newStorage = await Storage.create({
      filename: file.filename
    })

    return res.status(201).json(newStorage)
  } catch (error) {
    return handleHttpError({
      res,
      messageError: 'Error saving the filename on the db. ' + error.message,
      statusCode: 400
    })
  }
}

/**
 * Delete a storage from the db by id.
 * @param {*} req
 * @param {*} res
 * @returns
 * Deleted storage data.
 */
const deleteStorage = async (req, res) => {
  const { idStorage } = matchedData(req)
  try {
    const delStorage = await Storage.findByIdAndDelete(idStorage)
    if (!delStorage) throw new Error(`Doesn't exists the storage`)

    fs.unlinkSync(`${__dirname}/../storage/${delStorage.filename}`)

    return res.status(200).json(delStorage)
  } catch (error) {
    return handleHttpError({
      res,
      messageError: 'Error deleting the storage. ' + error.message,
      statusCode: 400
    })
  }
}

module.exports = {
  getAllStorages,
  getStorage,
  createStorage,
  deleteStorage
}
