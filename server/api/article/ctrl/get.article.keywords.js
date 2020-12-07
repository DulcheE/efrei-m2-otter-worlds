import Keyword from '../../../models/keyword.model'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getArticleKeywords (req, res) {
  const keywords = await Keyword.getByArticle(parseInt(req.params.id))
  res.status(200).json(Keyword.asResourceList(baseAPI(req), keywords, 'articles' + req.url))
}
