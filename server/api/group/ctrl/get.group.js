import Group from '../../../models/group.model'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getGroup (req, res) {
  try {
    const group = await Group.get(parseInt(req.params.id))
    res.status(200).json(group.asResource(baseAPI(req)))
  } catch (err) {
    res.status(404).json(err.message)
  }
}
