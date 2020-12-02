import Character from '../../../models/character.model'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getCharacters (req, res) {
  const characters = await Character.getAll()
  res.status(200).json(Character.asResourceList(baseAPI(req), characters))
}
