import Timeline from '../../../models/Timeline.model.js'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getUniverseTimelines (req, res) {
  const timelines = await Timeline.getByUniverse(parseInt(req.params.id))
  res.status(200).json(Timeline.asResourceList(baseAPI(req), timelines, 'universes' + req.url))
}
