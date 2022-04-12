const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const pathStorage = `${__dirname}/../storage`
    cb(null, pathStorage)
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop()
    const filename = `file_${Date.now()}.${ext}`
    cb(null, filename)
  }
})

/**
 * The multer object that provided all the functions of this dependency.
 * `uploadFileServer` comes with a customize options.
 */
const uploadFileServer = multer({ storage })

module.exports = uploadFileServer
