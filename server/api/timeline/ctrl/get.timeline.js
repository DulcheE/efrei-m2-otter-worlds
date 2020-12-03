import Timeline from '../../../models/timeline.model.js'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getTimeline (req, res) {
  try {
    const timeline = await Timeline.get(parseInt(req.params.id))
    res.status(200).json(timeline.asResource(baseAPI(req)))
  } catch (err) {
    res.status(404).json(err.message)
  }
}
