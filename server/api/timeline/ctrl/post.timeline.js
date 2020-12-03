import Timeline from '../../../models/timeline.model.js'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function postTimeline (req, res) {
  try {
    const newTimeline = await Timeline.add(req.body)
    res.status(200).json(newTimeline.asResource(baseAPI(req)))
  } catch (err) {
    res.status(400).json(err)
  }
}
