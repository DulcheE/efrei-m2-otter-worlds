import Inventory from '../../models/inventory.model'

export default function getInventories (req, res) {
  // NOTE: remove the "res.status(501).send({ message: 'not implemented' }})"
  //       to make it work
  Inventory.getAll()
    .then((inventories) => {
      res.status(200).json(Inventory.asResourceList(req, inventories))
    })
    .catch(err => res.status(404).json(err.message))
}
