import Article from '../../../models/article.model'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getKeywordArticles (req, res) {
  const universe = parseInt(req.query.universe)
  const keyword = decodeURI(req.query.keyword)

  const articles = await Article.getByKeyword(universe, keyword)
  res.status(200).json(Article.asResourceList(baseAPI(req), articles, 'keywords/query?universe=' + universe + '&keyword=' + keyword))
}
