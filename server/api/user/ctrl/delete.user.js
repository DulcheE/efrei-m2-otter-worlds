import User from '../../../models/user.model'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function deleteUser (req, res) {
  await User.remove(parseInt(req.params.id))
  await req.session.destroy()

  res.sendStatus(200)
}
