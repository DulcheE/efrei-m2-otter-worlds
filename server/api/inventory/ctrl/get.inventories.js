import Inventory from '../../../models/inventory.model'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getInventories (req, res) {
  const inventories = await Inventory.getAll()
  res.status(200).json(Inventory.asResourceList(baseAPI(req), inventories))
}
