import User from '../../models/user.model'

export default function getUser (req, res) {
  User.get(parseInt(req.params.id))
    .then((user) => {
      res.status(200).json(user.asResource(req))
    })
    .catch(err => res.status(404).send(err.message))
}
