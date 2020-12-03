import Inventory from '../../../models/inventory.model'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function deleteInventory (req, res) {
  const bSucceded = await Inventory.remove(parseInt(req.params.id))
  if (bSucceded) {
    res.status(200).json(bSucceded)
  } else {
    res.status(404).json(`Inventory ${req.params.id} don't exist !`)
  }
}
