import hal from 'hal'
import Character from '../../../models/character.model'
import { baseAPI } from '../../../api/routes'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getCharacterStats (req, res) {
  const stats = await Character.getStats(parseInt(req.params.id))
  const resource = hal.Resource(stats,
    `${baseAPI(req)}characters/${parseInt(req.params.id)}/stats`)
  res.status(200).json(resource)
}
