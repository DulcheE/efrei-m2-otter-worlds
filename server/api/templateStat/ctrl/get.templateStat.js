import TemplateStat from '../../../models/templateStat.model'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getTemplateStat (req, res) {
  try {
    const templateStat = await TemplateStat.get(parseInt(req.params.id))
    res.status(200).json(templateStat.asResource(baseAPI(req)))
  } catch (err) {
    res.status(404).json(err.message)
  }
}
