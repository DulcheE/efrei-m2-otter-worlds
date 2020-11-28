import User from '../../../models/user.model'

export default async function getMe (req, res) {
  const id = req.session.idUser
  console.log(id)
  if (id === undefined || id <= 0) {
    res.status(404).send('user not connected !')
  } else {
    try {
      const user = await User.get(id)
      res.status(200).send(user)
    } catch (err) {
      console.log(err)
      res.sendStatus(500)
    }
  }
}
