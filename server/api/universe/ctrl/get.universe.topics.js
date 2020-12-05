import Topic from '../../../models/Topic.model.js'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getUniverseTopics (req, res) {
  const topics = await Topic.getByUniverse(parseInt(req.params.id))
  res.status(200).json(Topic.asResourceList(baseAPI(req), topics, 'universes' + req.url))
}
