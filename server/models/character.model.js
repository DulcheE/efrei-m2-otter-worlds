import { baseAPI } from '../routes/routes'
import mariadbStore from '../mariadb-store'
const hal = require('hal')

export default class Character {
  /** @type {Number} */
  idCharacter
  /** @type {String} */
  name
  /** @type {String} */
  backstory
  /** @type {Number} */
  idUser
  /** @type {Number} */
  idUniverse

  /**
   * @param {Character} character
   */
  constructor (character) {
    this.idCharacter = character.idCharacter
    this.name = character.name
    this.backstory = character.backstory
    this.idUser = character.user_idUser || character.idUser
    this.idUniverse = character.universe_idUniverse || character.idUniverse
  }

  asResource (req) {
    // The data from the object
    const resource = hal.Resource(
      {
        id: this.idCharacter,
        name: this.name,
        backstory: this.backstory
      },
      `${baseAPI(req)}characters/${this.idCharacter}`)

    // the links one to one and many to one
    resource.link('user',
    `${baseAPI(req)}users/${this.idUser}`)
    resource.link('universe',
      `${baseAPI(req)}universes/${this.idUniverse}`)

    // the links one to many
    resource.link('inventories',
    `${baseAPI(req)}characters/${this.idCharacter}/inventories`)
    resource.link('stats',
      `${baseAPI(req)}characters/${this.idCharacter}/stats`)

    return resource
  }

  /**
   * @param req
   * @param characters {Character[]}
   * @param selfLink {string}
   */
  static asResourceList (req, characters, selfLink = 'characters') {
    const resourceCharacters = []
    for (const character of characters) {
      const _character = new Character(character)
      resourceCharacters.push(_character.asResource(req).toJSON())
    }

    const resource = hal.Resource({ characters: resourceCharacters }, baseAPI(req) + selfLink)

    return resource
  }

  /**
   * @returns {Promise<Character[]>}
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT * FROM `character`')
  }

  /**
   * @param {Number} id
   * @returns {Promise<Character>}
   */
  static async get (id) {
    const conn = (await mariadbStore.client.query('SELECT * FROM `character` WHERE idCharacter = ?', id))[0]
    if (!conn) {
      throw new Error(`Character ${id} don't exist !`)
    }

    return new Character(conn)
  }

  /**
   * @param {Character} character
   * @returns {Number} the id of the new inserted character
   */
  static async add (character) {
    const sql = `
      INSERT INTO 
        \`character\`(name, backstory, user_idUser, universe_idUniverse) 
        VALUES(?, ?, ?, ?)`
    // All the params we have to put to insert a new row in the table
    const params = [character.name, character.backstory, character.idUser, character.idUniverse]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.insertId || -1
  }

  /**
   * @param {Number} id
   * @param {Character} character
   * @returns {Boolean} if the character could have been updated
   */
  static async update (id, character) {
    const sql = `
      UPDATE \`character\`
        SET name = ?, backstory = ?
        WHERE idCharacter = ?`
    // All the cols you want to update for a character + the id of the character you want to update
    // /!\ You may never want to change the links
    const params = [character.name, character.backstory, id]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.affectedRows === 1
  }

  /**
   * @param {Number} id
   * @returns {Boolean} if the character could have been removed
   */
  static async remove (id) {
    const sql = `
      DELETE FROM \`character\`
        WHERE idCharacter = ?`
    const params = [id]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.affectedRows === 1
  }
}
