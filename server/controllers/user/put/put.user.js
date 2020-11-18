import User from '../../../models/user.model'

export default function updateUsername (req, res) {
  User.modifyName(req.body)
    .then((user) => {
      res.status(200).json(user)
    })
    .catch(err => res.status(404).send(err.message))
}
