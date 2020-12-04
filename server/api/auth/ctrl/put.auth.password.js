import User from '../../../models/user.model'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function changePassword (req, res) {
  try {
    const bSucceded = await User.changePasseword(req.body.newPassword, parseInt(req.params.id))
    res.status(200).json(bSucceded)
  } catch (err) {
    res.status(404).send(err.message)
  }
}
