import { baseAPI } from '../routes/routes'
import mariadbStore from '../mariadb-store'
import config from '../server.config.js'
const hal = require('hal')
const mariadb = require('mariadb')

export default class Character {
  /** @type {Number} */
  idCharacter
  /** @type {String} */
  name
  /** @type {String} */
  backstory
  /** @type {Boolean} */
  bIsDead
  /** @type {Boolean} */
  bIsSheetCompleted
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
    this.bIsDead = character.bIsDead
    this.bIsSheetCompleted = character.bIsSheetCompleted
    this.idUser = character.user_idUser || character.idUser
    this.idUniverse = character.universe_idUniverse || character.idUniverse
  }

  asResource (req) {
    // The data from the object
    const resource = hal.Resource(
      {
        id: this.idCharacter,
        name: this.name,
        bIsDead: !!this.bIsDead,
        bIsSheetCompleted: !!this.bIsSheetCompleted,
        backstory: this.backstory
      },
      `${baseAPI(req)}characters/${this.idCharacter}`)

    // the links one to one and many to one
    resource.link('user',
    `${baseAPI(req)}users/${this.idUser}`)
    resource.link('universe',
      `${baseAPI(req)}universes/${this.idUniverse}`)

    // the links one to many
    resource.link('groups',
    `${baseAPI(req)}characters/${this.idCharacter}/groups`)
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
   * @param {Number} id id of the character that we want the group
   * @returns {Promise<Groups>}
   */
  static async getGroups (id) {
    return await mariadbStore.client.query(`
      SELECT g.idGroup, g.name, g.universe_idUniverse FROM \`group\` g
      INNER JOIN characterInGroup cg
        ON cg.group_idGroup = g.idGroup
      WHERE cg.character_idCharacter = ?
    `, id)
  }

  /**
   * @param {Number} id id of the character that we want the inventory
   * @returns {Promise<Inventories>}
   */
  static async getInventories (id) {
    return await mariadbStore.client.query('SELECT * FROM inventory WHERE character_idCharacter = ?', id)
  }

  /**
   * @param {Number} id id of the character that we want all the stats
   * @returns {Promise<Character[]>}
   */
  static async getStats (id) {
    const rows = await mariadbStore.client.query('SELECT * FROM characterStats WHERE `character` = ?', id)

    const res = { categories: [] }
    if (rows.length === 0) { return res }

    let currentCategory = { id: rows[0].idTemplateCategory, name: rows[0].category, order: rows[0].order, stats: [] }

    for (const row of rows) {
      const category = {
        id: row.idTemplateCategory,
        name: row.category,
        order: row.order
      }

      if (currentCategory.id !== category.id) {
        res.categories.push(currentCategory)
        currentCategory = category
        currentCategory.stats = []
      }

      currentCategory.stats.push({
        id: row.idTemplateStat,
        name: row.stat,
        bIsNumber: !!row.bIsNumber,
        bIsRequired: !!row.bIsRequired,
        value: row.value
      })
    }

    res.categories.push(currentCategory)

    return res
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
   * @param {Number} idCharacter the id of the character we want to add in the group
   * @param {Number} idGroup the id of the group we want to add to the character
   * @returns {Boolean} if the group was succesfully add to the character
   */
  static async addGroup (idCharacter, idGroup) {
    const sql = `
      INSERT INTO 
        characterInGroup(group_idGroup, character_idCharacter) 
        VALUES(?, ?)`
    // All the params we have to put to insert a new row in the table
    const params = [idGroup, idCharacter]

    const rows = await mariadbStore.client.query(sql, params)
    console.log(rows)

    return rows.affectedRows === 1
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
   * @param {Object} stats
   * @returns {Boolean} if the character could have been updated
   */
  static async updateStats (id, stats) {
    const conn = await mariadb.createConnection(config.MARIADB)
    await conn.beginTransaction()

    const paramsArray = []

    for (const category of stats) {
      for (const stat of category.stats) {
        paramsArray.push([stat.value, id, stat.id, stat.value])
      }
    }

    const sql = `
    INSERT INTO stat(value, character_idCharacter, templateStat_idTemplateStat)
      VALUES(?, ?, ?)
      ON DUPLICATE KEY
        UPDATE value = ?`

    await Promise.all(paramsArray.map((params, index) => {
      return conn.query(sql, params)
        .catch(() => {
          conn.rollback().then(() => conn.end())

          throw new Error(`Could not update stat ${paramsArray[index][2]}`)
        })
    }))

    conn.commit().then(() => conn.end())

    return true
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

  /**
   * @param {Number} idCharacter the id of the character we want to remove from the group
   * @param {Number} idGroup the id of the group we want to remove to the character
   * @returns {Boolean} if the character could have been removed
   */
  static async removeGroup (idCharacter, idGroup) {
    const sql = `
    DELETE FROM characterInGroup
    WHERE character_idCharacter = ? AND group_idGroup = ?`
    const params = [idCharacter, idGroup]

    const rows = await mariadbStore.client.query(sql, params)
    console.log(rows)

    return rows.affectedRows === 1
  }
}
