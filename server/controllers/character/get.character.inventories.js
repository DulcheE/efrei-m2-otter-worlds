import Characters from '../../models/character.model'
import Inventory from '../../models/inventory.model'

export default function getCharacterInventories (req, res) {
  Characters.getInventories(parseInt(req.params.id))
    .then((inventories) => {
      const characterInventories = Inventory.asResourceList(req, inventories, 'characters' + req.url)
      characterInventories.totalWeight = 0
      characterInventories.inventories.forEach((inventory) => {
        characterInventories.totalWeight += inventory.weight * inventory.number
      })

      res.status(200).json(characterInventories)
    })
}
