import Article from '../../../models/article.model'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getArticle (req, res) {
  try {
    const article = await Article.get(parseInt(req.params.id))
    res.status(200).json(article.asResource(baseAPI(req)))
  } catch (err) {
    res.status(404).json(err.message)
  }
}
