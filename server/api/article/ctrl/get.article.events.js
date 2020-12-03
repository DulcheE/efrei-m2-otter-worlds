import Event from '../../../models/event.model'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getArticleEvents (req, res) {
  const events = await Event.getByArticle(parseInt(req.params.id))
  res.status(200).json(Event.asResourceList(baseAPI(req), events, 'articles' + req.url))
}
