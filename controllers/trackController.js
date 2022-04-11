const { matchedData } = require('express-validator')
const Track = require('../models/nosql/Track')
const { handleHttpError } = require('../utils/handleErrors')

/**
 * get all tracks from the db
 * @param {*} req
 * @param {*} res
 */
const getAllTracks = async (req, res) => {
  try {
    const tracks = await Track.find().lean()
    return res.status(200).json(tracks)
  } catch (error) {
    return handleHttpError({
      res,
      messageError: 'Error getting all tracks. ' + error.message,
      statusCode: 400
    })
  }
}

/**
 * get just one track from the db
 * @param {*} req
 * @param {*} res
 */
const getTrack = async (req, res) => {
  const { idTrack } = matchedData(req)
  try {
    const track = await Track.findById(idTrack)

    if (!track) throw new Error(`Doesn't exists the track.`)

    return res.status(200).json(track)
  } catch (error) {
    return handleHttpError({
      res,
      messageError: 'Error getting the track. ' + error.message,
      statusCode: 400
    })
  }
}

/**
 * create a track and insert to the db
 * @param {*} req
 * @param {*} res
 */
const createTrack = async (req, res) => {
  const body = matchedData(req) //return data clean and that matched with the validation
  try {
    const newTrack = await Track.create(body)
    return res.status(201).json(newTrack)
  } catch (error) {
    return handleHttpError({
      res,
      messageError: 'Error creating the track. ' + error.message,
      statusCode: 400
    })
  }
}

/**
 * update a track and reload to the db
 * @param {*} req
 * @param {*} res
 */
const updateTrack = async (req, res) => {
  const { idTrack, ...body } = matchedData(req)
  try {
    await Track.findByIdAndUpdate(idTrack, body)
    const updatedSong = await Track.findById(idTrack)
    if (!updatedSong) throw new Error(`Doesn't exists the track.`)
    return res.status(200).json(updatedSong)
  } catch (error) {
    return handleHttpError({
      res,
      messageError: 'Error updating the track. ' + error.message,
      statusCode: 400
    })
  }
}

/**
 * delete a track from the db by idb
 * @param {*} req
 * @param {*} res
 */
const deleteTrack = async (req, res) => {
  const { idTrack } = matchedData(req)
  try {
    const delTrack = await Track.findByIdAndDelete(idTrack)
    if (!delTrack) throw new Error(`Doesn't exists the track.`)
    return res.status(200).json(delTrack)
  } catch (error) {
    return handleHttpError({
      res,
      messageError: 'Error deleting the track. ' + error.message,
      statusCode: 400
    })
  }
}

module.exports = {
  getAllTracks,
  getTrack,
  createTrack,
  updateTrack,
  deleteTrack
}
