import Group from '../../../models/group.model.js'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getUniverseTemplateCategories (req, res) {
  const groups = await Group.getByUniverse(parseInt(req.params.id))
  res.status(200).json(Group.asResourceList(baseAPI(req), groups, 'universes' + req.url))
}
