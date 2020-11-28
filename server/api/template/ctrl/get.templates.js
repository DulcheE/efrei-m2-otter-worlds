import Template from '../../../models/template.model'

export default function getTemplates (req, res) {
  // NOTE: remove the "res.status(501).send({ message: 'not implemented' }})"
  //       to make it work
  Template.getAll()
    .then((templates) => {
      res.status(200).json(Template.asResourceList(req, templates))
    })
    .catch(err => res.status(404).json(err.message))
}
