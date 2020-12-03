import Characters from '../../../models/character.model'
import Group from '../../../models/group.model'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getCharacterGroups (req, res) {
  const groups = await Characters.getGroups(parseInt(req.params.id))
  res.status(200).json(Group.asResourceList(baseAPI(req), groups, 'characters' + req.url))
}
