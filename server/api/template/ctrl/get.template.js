import Template from '../../../models/template.model'

export default function getTemplate (req, res) {
  Template.get(parseInt(req.params.id))
    .then((template) => {
      res.status(200).json(template.asResource(req))
    })
    .catch(err => res.status(404).json(err.message))
}
