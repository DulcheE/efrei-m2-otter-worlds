import Event from '../../../models/event.model.js'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getTemplates (req, res) {
  const events = await Event.getAll()
  res.status(200).json(Event.asResourceList(baseAPI(req), events))
}
