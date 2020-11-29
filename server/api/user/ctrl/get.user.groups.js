import Users from '../../../models/user.model'
import Group from '../../../models/group.model'

export default async function getUserGroups (req, res) {
  const groups = await Users.getGroups(parseInt(req.params.id), parseInt(req.body.idUniverse))

  res.status(200).json(Group.asResourceList(req, groups, 'users' + req.url))
}
