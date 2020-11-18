import Inventory from '../../models/inventory.model'

export default function getInventory (req, res) {
  Inventory.get(parseInt(req.params.id))
    .then((inventory) => {
      res.status(200).json(inventory.asResource(req))
    })
    .catch(err => res.status(404).json(err.message))
}
