import Character from '../../../models/character.model'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getUniverseCharacters (req, res) {
  const characters = await Character.getByUniverse(parseInt(req.params.id))
  res.status(200).json(Character.asResourceList(baseAPI(req), characters, 'universes' + req.url))
}
