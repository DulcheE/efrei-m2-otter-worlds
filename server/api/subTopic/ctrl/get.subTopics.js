import SubTopic from '../../../models/subTopic.model'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getSubTopics (req, res) {
  const subTopics = await SubTopic.getAll()
  res.status(200).json(SubTopic.asResourceList(baseAPI(req), subTopics))
}
