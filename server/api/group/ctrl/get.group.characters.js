import Groups from '../../../models/group.model'
import Character from '../../../models/character.model'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getGroupCharacters (req, res) {
  const characters = await Groups.getCharacters(parseInt(req.params.id))
  res.status(200).json(Character.asResourceList(req, characters, 'groups' + req.url))
}
