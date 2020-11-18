import TemplateCategory from '../../models/templateCategory.model'

export default function getTemplateCategory (req, res) {
  TemplateCategory.get(parseInt(req.params.id))
    .then((templateCategory) => {
      res.status(200).json(templateCategory.asResource(req))
    })
    .catch(err => res.status(404).json(err.message))
}
