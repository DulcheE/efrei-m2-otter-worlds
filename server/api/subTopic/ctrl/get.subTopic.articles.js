import Article from '../../../models/Article.model'
import { baseAPI } from '../../routes.js'
/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getSubTopicArticles (req, res) {
  const Articles = await Article.getBySubTopic(parseInt(req.params.id))
  res.status(200).json(Article.asResourceList(baseAPI(req), Articles, 'sub-topics' + req.url))
}
