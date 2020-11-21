import { baseAPI } from '../routes/routes'
import mariadbStore from '../mariadb-store'
const hal = require('hal')

export default class Group {
  /** @type {Number} */
  idGroup
  /** @type {String} */
  name
  /** @type {Number} */
  idUniverse

  /**
   * @param {Group} group
   */
  constructor (group) {
    this.idGroup = group.idGroup
    this.name = group.name
    this.idUniverse = group.universe_idUniverse || group.idUniverse
  }

  asResource (req) {
    // The data from the object
    const resource = hal.Resource(
      {
        id: this.idGroup,
        name: this.name
      },
      `${baseAPI(req)}groups/${this.idGroup}`)

    // the links one to one and many to one
    resource.link('universe',
      `${baseAPI(req)}universes/${this.idUniverse}`)

    // the links one to many
    resource.link('characters',
      `${baseAPI(req)}groups/${this.idGroup}/characters`)

    return resource
  }

  /**
   * @param req
   * @param groups {Group[]}
   * @param selfLink {string}
   */
  static asResourceList (req, groups, selfLink = 'groups') {
    const resourceGroups = []
    for (const group of groups) {
      const _group = new Group(group)
      resourceGroups.push(_group.asResource(req).toJSON())
    }

    const resource = hal.Resource({ groups: resourceGroups }, baseAPI(req) + selfLink)

    return resource
  }

  /**
   * @returns {Promise<Group[]>}
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT * FROM `group`')
  }

  /**
   * @param {Number} id
   * @returns {Promise<Group>}
   */
  static async get (id) {
    const conn = (await mariadbStore.client.query('SELECT * FROM `group` WHERE idGroup = ?', id))[0]
    if (!conn) {
      throw new Error(`Group ${id} don't exist !`)
    }

    return new Group(conn)
  }

  /**
   * @param {Number} id id of the character that we want the inventory
   * @returns {Promise<Characters>}
   */
  static async getCharacters (id) {
    return await mariadbStore.client.query(`
      SELECT * FROM \`character\` c
      INNER JOIN characterInGroup cg
        ON cg.character_idCharacter = c.idCharacter
      WHERE group_idGroup = ?
    `, id)
  }

  /**
   * @param {Group} group
   * @returns {Number} the id of the new inserted group
   */
  static async add (group) {
    const sql = `
      INSERT INTO 
        \`group\`(name, universe_idUniverse) 
        VALUES(?, ?)`
    // All the params we have to put to insert a new row in the table
    const params = [group.name, group.idUniverse]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.insertId || -1
  }

  /**
   * @param {Number} id
   * @param {Group} group
   * @returns {Boolean} if the group could have been updated
   */
  static async update (id, group) {
    const sql = `
      UPDATE \`group\`
        SET name = ?
        WHERE idGroup = ?`
    // All the cols you want to update for a group + the id of the group you want to update
    // /!\ You may never want to change the links
    const params = [group.name, id]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.affectedRows === 1
  }

  /**
   * @param {Number} id
   * @returns {Boolean} if the group could have been removed
   */
  static async remove (id) {
    const sql = `
      DELETE FROM \`group\`
        WHERE idGroup = ?`
    const params = [id]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.affectedRows === 1
  }
}
