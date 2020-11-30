import Universe from '../../../models/universe.model.js'
import TemplateCategory from '../../../models/templateCategory.model.js'

export default async function getUniverseTemplateCategories (req, res) {
  const templateCategories = await Universe.getTemplateCategories(parseInt(req.params.id))

  res.status(200).json(TemplateCategory.asResourceList(req, templateCategories, 'universes' + req.url))
}
