import mariadbStore from '../mariadb-store'
import { HalResource, HalResourceData, HalToOneLinks } from '../middlewares/hal-parser.js'

class HalResourceDataInventory extends HalResourceData {
  /** @type { String } */
  name
  /** @type { Number } */
  number
  /** @type { String } */
  description
  /** @type { Number } */
  weight
}

class HalToOneLinksInventory extends HalToOneLinks {
  /** @type { Number } */
  character
}

export default class Inventory extends HalResource {
  /** @type { HalResourceDataInventory } */
  data
  /** @type { HalToOneLinksInventory } */
  toOneLinks
  /** @type { String[] } */
  static toManyLinks = []

  /**
   * @param { Inventory } inventory
   */
  constructor (inventory) {
    super()

    this.id = inventory.idInventory || inventory.id

    this.data = new HalResourceDataInventory()
    this.data.name = inventory.name
    this.data.number = inventory.number
    this.data.description = inventory.description
    this.data.weight = inventory.weight

    this.toOneLinks = new HalToOneLinksInventory()
    this.toOneLinks.character = inventory.character_idCharacter || inventory.character
  }

  /**
   * @param { String } baseAPI
   * @param { String } resourcePath
   */
  asResource (baseAPI, resourcePath = 'inventories') {
    return super.asResource(baseAPI, resourcePath)
  }

  /**
   * @param { String } baseAPI
   * @param { HalResource[] } list
   * @param { String } selfLink
   * @param { String } resourcePath
   */
  static asResourceList (baseAPI, list, selfLink = 'inventories', resourcePath = 'inventories') {
    return super.asResourceList(baseAPI, list, selfLink, resourcePath, Inventory)
  }

  /// GET

  /**
   * @returns { Promise<Inventory[]> }
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT * FROM inventory')
  }

  /**
   * @param { Number } id id of the inventory
   * @returns { Promise<Inventory> }
   */
  static async get (id) {
    return new Inventory((await mariadbStore.client.query('SELECT * FROM inventory WHERE idInventory = ?', id))[0])
  }

  /**
   * @param { Number } id id of the character that we want the inventories
   * @returns { Promise<Inventory[]> }
   */
  static async getByCharacter (id) {
    return await mariadbStore.client.query('SELECT * FROM inventory WHERE character_idCharacter = ?', id)
  }

  /// POST

  /**
   * @param { { name: String, number: Number, description: String, weight: Number, idCharacter: Number } } inventory
   * @returns { Promise<Inventory> } the id of the new inserted inventory
   */
  static async add (inventory) {
    const sql = `
      INSERT INTO 
        inventory(name, number, description, weight, character_idCharacter) 
        VALUES(?, ?, ?, ?, ?)
      RETURNING *`
    // All the params we have to put to insert a new row in the table
    const params = [inventory.name, inventory.number, inventory.description, inventory.weight, inventory.idCharacter]

    return new Inventory((await mariadbStore.client.query(sql, params))[0])
  }

  /// PUT

  /**
   * @param { Number } id id of the inventory
   * @param { { name: String, number: Number, description: String, weight: Number } } inventory
   * @returns { Promise<Inventory> } if the inventory could have been updated
   */
  static async update (id, inventory) {
    const sql = `
      INSERT INTO
        inventory(idInventory) VALUES(?)
      ON DUPLICATE KEY UPDATE
        name = ?, number = ?, description = ?, weight = ?
      RETURNING *`
    const params = [id, inventory.name, inventory.number, inventory.description, inventory.weight]

    return new Inventory((await mariadbStore.client.query(sql, params))[0])
  }

  /// DELETE

  /**
   * @param { Number } id id of the inventory
   * @returns { Promise<Boolean> } if the inventory could have been removed
   */
  static async remove (id) {
    const sql = `
      DELETE FROM inventory
        WHERE idInventory = ?`
    const params = [id]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.affectedRows === 1
  }
}
