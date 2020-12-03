import Universe from '../../../models/universe.model'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getUniverses (req, res) {
  const universes = await Universe.getAll()
  res.status(200).json(Universe.asResourceList(baseAPI(req), universes))
}
