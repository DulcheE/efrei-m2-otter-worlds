import Users from '../../../models/user.model'
import Group from '../../../models/group.model'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getUserGroups (req, res) {
  const groups = await Users.getGroups(parseInt(req.params.id), parseInt(req.body.idUniverse))
  res.status(200).json(Group.asResourceList(baseAPI(req), groups, 'users' + req.url))
}
