import TemplateStat from '../../../models/templateStat.model.js'
import { baseAPI } from '../../routes.js'

export default async function getUniverseTemplateCategories (req, res) {
  const templateStat = await TemplateStat.getByTemplateCategory(parseInt(req.params.id))
  res.status(200).json(TemplateStat.asResourceList(baseAPI(req), templateStat, 'TemplateCategory' + req.url))
}
