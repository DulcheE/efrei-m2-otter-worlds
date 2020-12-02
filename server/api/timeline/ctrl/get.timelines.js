import Timeline from '../../../models/timeline.model.js'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getTimelines (req, res) {
  const timelines = await Timeline.getAll()
  res.status(200).json(Timeline.asResourceList(baseAPI(req), timelines))
}
