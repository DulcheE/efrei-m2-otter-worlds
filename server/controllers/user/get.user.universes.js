import Universe from '../../models/universe.model'
import User from '../../models/user.model'

export default function getUserUniverse (req, res) {
  User.getUniverses(parseInt(req.params.id))
    .then((univere) => {
      res.status(200).json(Universe.asResourceList(req, univere, 'user' + req.url))
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}
