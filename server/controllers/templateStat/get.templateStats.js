import TemplateStat from '../../models/templateStat.model'

export default function getTemplateStats (req, res) {
  // NOTE: remove the "res.status(501).send({ message: 'not implemented' }})"
  //       to make it work
  TemplateStat.getAll()
    .then((templateStats) => {
      res.status(200).json(TemplateStat.asResourceList(req, templateStats))
    })
    .catch(err => res.status(404).json(err.message))
}
