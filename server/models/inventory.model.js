import { baseAPI } from '../api/routes'
import mariadbStore from '../mariadb-store'
const hal = require('hal')

export default class Inventory {
  /** @type {Number} */
  idInventory
  /** @type {String} */
  name
  /** @type {Number} */
  number
  /** @type {String} */
  description
  /** @type {Number} */
  weight
  /** @type {Number} */
  idCharacter

  /**
   * @param {Inventory} inventory
   */
  constructor (inventory) {
    this.idInventory = inventory.idInventory
    this.name = inventory.name
    this.number = inventory.number
    this.description = inventory.description
    this.weight = inventory.weight
    this.idCharacter = inventory.character_idCharacter || inventory.idCharacter
  }

  asResource (req) {
    // The data from the object
    const resource = hal.Resource(
      {
        id: this.idInventory,
        name: this.name,
        number: this.number,
        description: this.description,
        weight: this.weight
      },
      `${baseAPI(req)}inventories/${this.idInventory}`)

    // the links one to one and many to one
    resource.link('character',
      `${baseAPI(req)}characters/${this.idCharacter}`)

    // the links one to many

    return resource
  }

  /**
   * @param req
   * @param inventories {Inventory[]}
   * @param selfLink {string}
   */
  static asResourceList (req, inventories, selfLink = 'inventories') {
    const resourceInventories = []
    for (const inventory of inventories) {
      const _inventory = new Inventory(inventory)
      resourceInventories.push(_inventory.asResource(req).toJSON())
    }

    const resource = hal.Resource({ inventories: resourceInventories }, baseAPI(req) + selfLink)

    return resource
  }

  /**
   * @returns {Promise<Inventory[]>}
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT * FROM inventory')
  }

  /**
   * @param {Number} id
   * @returns {Promise<Inventory>}
   */
  static async get (id) {
    const conn = (await mariadbStore.client.query('SELECT * FROM inventory WHERE idInventory = ?', id))[0]
    if (!conn) {
      throw new Error(`Inventory ${id} don't exist !`)
    }

    return new Inventory(conn)
  }

  /**
   * @param {Inventory} inventory
   * @returns {Number} the id of the new inserted inventory
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
   * @param {Number} id
   * @param {Inventory} inventory
   * @returns {Boolean} if the inventory could have been updated
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
   * @param {Number} id
   * @returns {Boolean} if the inventory could have been removed
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
