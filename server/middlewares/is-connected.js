/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
function isConnected (req, res, next) {
  if (req.session.idUser) {
    next()
    return
  }
  res.status(401).send({ error: 'Not authenticated' })
}

module.exports = isConnected
