import User from '../../../models/user.model'

export default function updatePassword (req, res) {
  User.ChangePasseword(req.body, req.params.code, parseInt(req.params.id))
    .then((user) => {
      res.status(200).json(user)
    })
    .catch(err => res.status(404).send(err.message))
}
