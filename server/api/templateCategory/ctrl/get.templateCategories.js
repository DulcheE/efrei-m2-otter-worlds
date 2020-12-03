import TemplateCategory from '../../../models/templateCategory.model'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getTemplateCategories (req, res) {
  const templateCategories = await TemplateCategory.getAll()
  res.status(200).json(TemplateCategory.asResourceList(baseAPI(req), templateCategories))
}
