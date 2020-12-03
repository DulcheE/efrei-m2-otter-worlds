import TemplateCategory from '../../../models/templateCategory.model'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function deleteTemplateCategory (req, res) {
  const bSucceded = await TemplateCategory.remove(parseInt(req.params.id))
  if (bSucceded) {
    res.status(200).json(bSucceded)
  } else {
    res.status(404).json(`TemplateCategory ${req.params.id} don't exist !`)
  }
}
