import TemplateCategory from '../../../models/templateCategory.model'

export default function getTemplateCategories (req, res) {
  // NOTE: remove the "res.status(501).send({ message: 'not implemented' }})"
  //       to make it work
  TemplateCategory.getAll()
    .then((templateCategories) => {
      res.status(200).json(TemplateCategory.asResourceList(req, templateCategories))
    })
    .catch(err => res.status(404).json(err.message))
}
