import Map from '../../../models/map.model.js'
import { baseAPI } from '../../routes.js'

export default async function getTimeline (req, res) {
  try {
    const map = await Map.get(parseInt(req.params.id))
    res.status(200).json(map.asResource(baseAPI(req)))
  } catch (err) {
    res.status(400).json(err.message)
  }
}
