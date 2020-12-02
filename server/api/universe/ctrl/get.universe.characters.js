import Universe from '../../../models/universe.model'
import Characters from '../../../models/character.model'
import { baseAPI } from '../../routes.js'


/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getUniverseCharacters (req, res) {
  const characters = await Universe.getCharacters(parseInt(req.params.id))
  res.status(200).json(Characters.asResourceList(baseAPI(req), characters, 'universes' + req.url))
}
