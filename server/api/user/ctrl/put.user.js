import User from '../../../models/user.model'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function updateUsername (req, res) {
  try {
    const user = await User.modifyName(new User(req.body), parseInt(req.params.id))
    res.status(200).json(user)
  } catch (err) {
    res.status(404).send(err.message)
  }
}
