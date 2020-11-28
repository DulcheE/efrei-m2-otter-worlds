import TemplateStat from '../../../models/templateStat.model'

export default function getTemplateStat (req, res) {
  TemplateStat.get(parseInt(req.params.id))
    .then((templateStat) => {
      res.status(200).json(templateStat.asResource(req))
    })
    .catch(err => res.status(404).json(err.message))
}
