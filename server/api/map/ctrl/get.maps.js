import Map from '../../../models/map.model.js'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getTemplates (req, res) {
  const maps = await Map.getAll()
  res.status(200).json(Map.asResourceList(baseAPI(req), maps))
}
