/**
 * Handle http errors.
 * @param {*} object `res` is the response from the http request.
 * `messageError` (optional) is the message error that will appear on the response.
 * `statusCode` is the status from the http request
 */
const handleHttpError = ({
  res,
  messageError = 'Something wrong...',
  statusCode
}) => {
  res.status(statusCode).json({ error: messageError })
}

module.exports = { handleHttpError }
