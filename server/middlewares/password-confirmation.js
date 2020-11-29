import mariadbStore from '../mariadb-store.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { import('express').NextFunction } next
 */
export default async function passwordConfirmation (req, res, next) {
  const row = (await mariadbStore.client.query('SELECT `password` FROM user WHERE idUser = ?', req.session.idUser))[0]

  if (req.body.password === row.password) {
    next()
    return
  }
  res.status(401).send({ error: 'Invalid password' })
}
