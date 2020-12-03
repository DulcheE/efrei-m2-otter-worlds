import Inventory from '../../../models/inventory.model'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getInventory (req, res) {
  try {
    const inventory = await Inventory.get(parseInt(req.params.id))
    res.status(200).json(inventory.asResource(baseAPI(req)))
  } catch (err) {
    res.status(404).json(err.message)
  }
}
