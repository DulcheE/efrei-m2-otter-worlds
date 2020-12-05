import Map from '../../../models/Map.model.js'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getUniverseMaps (req, res) {
  const maps = await Map.getByUniverse(parseInt(req.params.id))
  res.status(200).json(Map.asResourceList(baseAPI(req), maps, 'universes' + req.url))
}
