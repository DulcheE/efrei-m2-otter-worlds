import User from '../../models/user.model'

export default function getUsers (req, res) {
  // NOTE: remove the "res.status(501).send({ message: 'not implemented' }})"
  //       to make it work
  User.getAll()
    .then((users) => {
      res.status(200).json(User.asResourceList(req, users))
    })
}
