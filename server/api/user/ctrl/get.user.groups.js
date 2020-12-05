import Group from '../../../models/group.model'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getUserGroups (req, res) {
  const groups = await Group.getByUserInUniverse(parseInt(req.params.id), parseInt(req.query.universe))
  res.status(200).json(Group.asResourceList(baseAPI(req), groups, 'users' + req.url))
}
