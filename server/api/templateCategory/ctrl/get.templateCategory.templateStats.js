import TemplateStat from '../../../models/templateStat.model.js'
import { baseAPI } from '../../routes.js'

export default async function getTemplateCategoryTemplateStats (req, res) {
  const templateStats = await TemplateStat.getByTemplateCategory(parseInt(req.params.id))
  res.status(200).json(TemplateStat.asResourceList(baseAPI(req), templateStats, 'TemplateCategory' + req.url))
}
