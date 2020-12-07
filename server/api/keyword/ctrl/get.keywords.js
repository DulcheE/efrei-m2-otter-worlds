import hal from 'hal'
import Keyword from '../../../models/keyword.model'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getKeywords (req, res) {
  const keywords = await Keyword.getAll()

  const resources = []
  for (const item of keywords) {
    const keyword = new Keyword(item)
    const resource = keyword.asResource(baseAPI(req))
    resources.push(resource)
  }

  res.status(200).json(hal.Resource({ list: resources }, baseAPI(req) + 'keywords'))
}
