import TemplateCategory from '../../../models/templateCategory.model.js'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getUniverseTemplateCategories (req, res) {
  const templateCategories = await TemplateCategory.getByUniverse(parseInt(req.params.id))
  res.status(200).json(TemplateCategory.asResourceList(baseAPI(req), templateCategories, 'universes' + req.url))
}
