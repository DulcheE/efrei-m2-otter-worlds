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
   * @returns { hal.Resource }
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

  /**
   * @returns { Promise<Inventory[]> }
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT * FROM inventory')
  }

  /**
   * @param { Number } id
   * @returns { Promise<Inventory> }
   */
  static async get (id) {
    const conn = (await mariadbStore.client.query('SELECT * FROM inventory WHERE idInventory = ?', id))[0]
    if (!conn) {
      throw new Error(`Inventory ${id} don't exist !`)
    }

    return new Inventory(conn)
  }

  /**
   * @param { Inventory } inventory
   * @returns { Number } the id of the new inserted inventory
   */
  static async add (inventory) {
    const sql = `
      INSERT INTO 
        inventory(name, number, description, weight, character_idCharacter) 
        VALUES(?, ?, ?, ?, ?)`
    // All the params we have to put to insert a new row in the table
    const params = [inventory.name, inventory.number, inventory.description, inventory.weight, inventory.idCharacter]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.insertId || -1
  }

  /**
   * @param { Number } id
   * @param { Inventory } inventory
   * @returns { Boolean } if the inventory could have been updated
   */
  static async update (id, inventory) {
    const sql = `
      UPDATE inventory
        SET name = ?, number = ?, description = ?, weight = ?
        WHERE idInventory = ?`
    // All the cols you want to update for a inventory + the id of the inventory you want to update
    // /!\ You may never want to change the links
    const params = [inventory.name, inventory.number, inventory.description, inventory.weight, id]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.affectedRows === 1
  }

  /**
   * @param { Number } id
   * @returns { Boolean } if the inventory could have been removed
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
