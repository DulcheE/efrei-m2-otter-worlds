import TemplateCategory from '../../../models/templateCategory.model.js'
import TemplateStat from '../../../models/templateStat.model.js'

export default async function getUniverseTemplateCategories (req, res) {
  const templateStat = await TemplateCategory.getTemplateStat(parseInt(req.params.id))

  res.status(200).json(TemplateStat.asResourceList(req, templateStat, 'TemplateCategory' + req.url))
}
