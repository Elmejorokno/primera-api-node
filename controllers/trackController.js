const { matchedData } = require('express-validator')
const Track = require('../models/nosql/Track')
const { handleHttpError } = require('../utils/handleErrors')

/**
 * Get all tracks from the db.
 * @param {*} req
 * @param {*} res
 * @returns
 * All tracks from the db.
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
 * Get just one track from the db.
 * Select the track for a id provided in the url params. Called idTrack.
 * @param {*} req
 * @param {*} res
 * @returns
 * The data track matched.
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
 * Create a track and insert to the db.
 * @param {*} req
 * @param {*} res
 * @returns
 * The created track.
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
 * Update a track and reload to the db.
 * @param {*} req
 * @param {*} res
 * @returns
 * The updated track.
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
 * Delete a track from the db by id.
 * @param {*} req
 * @param {*} res
 * @returns
 * The deleted track.
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
