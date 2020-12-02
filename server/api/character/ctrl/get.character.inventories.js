import Characters from '../../../models/character.model'
import Inventory from '../../../models/inventory.model'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getCharacterInventories (req, res) {
  const inventories = await Characters.getInventories(parseInt(req.params.id))
  const characterInventories = Inventory.asResourceList(baseAPI(req), inventories, 'characters' + req.url)
  characterInventories.totalWeight = 0
  characterInventories.list.forEach((inventory) => {
    characterInventories.totalWeight += inventory.weight * inventory.number
  })

  res.status(200).json(characterInventories)
}
