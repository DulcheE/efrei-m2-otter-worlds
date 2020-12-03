import Topic from '../../../models/topic.model'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getTopic (req, res) {
  try {
    const topic = await Topic.get(parseInt(req.params.id))
    res.status(200).json(topic.asResource(baseAPI(req)))
  } catch (err) {
    res.status(404).json(err.message)
  }
}
