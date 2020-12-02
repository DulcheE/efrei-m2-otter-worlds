import Article from '../../../models/article.model'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function deleteTemplate (req, res) {
  const bSucceded = await Article.remove(parseInt(req.params.id))
  if (bSucceded) {
    res.status(200).json(bSucceded)
  } else {
    res.status(404).json(`Template ${req.params.id} don't exist !`)
  }
}
