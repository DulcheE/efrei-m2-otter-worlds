import User from '../../../models/user.model'

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export default async function login (req, res) {
  let user
  try {
    user = await User.getByName(req.body.username)
  } catch { }

  if (!user || req.body.password !== user.password) {
    res.status(400).json({ message: 'Wrong username or password !' })
    return
  }

  req.session.idUser = user.idUser

  res.status(200).json({ id: user.idUser, username: user.username })
}
