import Universe from '../../../models/universe.model.js'
import TemplateCategory from '../../../models/templateCategory.model.js'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getUniverseTemplateCategories (req, res) {
  const templateCategories = await Universe.getTemplateCategories(parseInt(req.params.id))
  res.status(200).json(TemplateCategory.asResourceList(baseAPI(req), templateCategories, 'universes' + req.url))
}
