import Event from '../../../models/event.model.js'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getTimelineEvent (req, res) {
  const events = await Event.getByTimeline(parseInt(req.params.id))
  res.status(200).json(Event.asResourceList(baseAPI(req), events, 'events' + req.url))
}
