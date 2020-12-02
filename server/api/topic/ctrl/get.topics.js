import Topic from '../../../models/topic.model'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getTopics (req, res) {
  const topics = await Topic.getAll()
  res.status(200).json(Topic.asResourceList(baseAPI(req), topics))
}
