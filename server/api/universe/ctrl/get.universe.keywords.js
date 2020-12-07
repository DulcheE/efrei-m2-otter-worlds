import Keyword from '../../../models/Keyword.model.js'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getUniverseKeywords (req, res) {
  console.log('here')
  const keywords = await Keyword.getByUniverse(parseInt(req.params.id))
  console.log(keywords)
  res.status(200).json(Keyword.asResourceList(baseAPI(req), keywords, 'universes' + req.url))
}
