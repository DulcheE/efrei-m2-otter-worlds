import Group from '../../../models/group.model'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getGroups (req, res) {
  const groups = await Group.getAll()
  res.status(200).json(Group.asResourceList(baseAPI(req), groups))
}
