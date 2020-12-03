import Keyword from '../../../models/keyword.model'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getKeyword (req, res) {
  try {
    const keyword = await Keyword.get(parseInt(req.params.id))
    res.status(200).json(keyword.asResource(baseAPI(req)))
  } catch (err) {
    res.status(404).json(err.message)
  }
}
