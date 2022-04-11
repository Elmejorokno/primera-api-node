const handleHttpError = ({
  res,
  messageError = 'Something wrong...',
  statusCode
}) => {
  res.status(statusCode).json({ error: messageError })
}

module.exports = { handleHttpError }
