import User from '../../models/user.model'

export default function login (req, res) {
  User.Login(new User(req.body))
    .then((result) => {
      res.status(200).json(true)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}
