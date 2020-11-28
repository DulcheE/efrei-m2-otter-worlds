import Users from '../../../models/user.model'
import Group from '../../../models/group.model'

export default function getUserGroups (req, res) {
  Users.getGroups(parseInt(req.params.id), parseInt(req.body.idUniverse))
    .then((groups) => {
      console.log(groups)
      res.status(200).json(Group.asResourceList(req, groups, 'users' + req.url))
    })
}
