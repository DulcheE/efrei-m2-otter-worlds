import mariadbStore from '../mariadb-store'
import { HalResource, HalResourceData, HalToOneLinks } from '../middlewares/hal-parser.js'

class HalResourceDataGroup extends HalResourceData {
  /** @type { String } */
  name
}

class HalToOneLinksGroup extends HalToOneLinks {
  /** @type { Number } */
  universe
}

export default class Group extends HalResource {
  /** @type { HalResourceDataGroup } */
  data
  /** @type { HalToOneLinksGroup } */
  toOneLinks
  /** @type { String[] } */
  static toManyLinks = ['characters']

  /**
   * @param { Group } group
   */
  constructor (group) {
    super()

    this.id = group.idGroup || group.id

    this.data = new HalResourceDataGroup()
    this.data.name = group.name || group.data.name

    this.toOneLinks = new HalToOneLinksGroup()
    this.toOneLinks.universe = group.universe_idUniverse || group.toOneLinks.universe
  }

  /**
   * @param { String } baseAPI
   * @param { String } resourcePath
   */
  asResource (baseAPI, resourcePath = 'groups') {
    return super.asResource(baseAPI, resourcePath)
  }

  /**
   * @param { String } baseAPI
   * @param { HalResource[] } list
   * @param { String } selfLink
   * @param { String } resourcePath
   */
  static asResourceList (baseAPI, list, selfLink = 'groups', resourcePath = 'groups') {
    return super.asResourceList(baseAPI, list, selfLink, resourcePath, Group)
  }

  /// GET

  /**
   * @returns { Promise<Group[]> }
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT * FROM `group`')
  }

  /**
   * @param { Number } id id of the group
   * @returns { Promise<Group> }
   */
  static async get (id) {
    return new Group((await mariadbStore.client.query('SELECT * FROM `group` WHERE idGroup = ?', id))[0])
  }

  /**
   * @param { Number } id id of the character that we want the groups
   * @returns { Promise<Group[]> }
   */
  static async getByCharacter (id) {
    return await mariadbStore.client.query(`
      SELECT g.idGroup, g.name, g.universe_idUniverse FROM \`group\` g
      INNER JOIN characterInGroup cg
        ON cg.group_idGroup = g.idGroup
      WHERE cg.character_idCharacter = ?
    `, id)
  }

  /**
   * @param { Number } id id of the universe
   * @returns { Promise<Group[]> }
   */
  static async getByUniverse (id) {
    return await mariadbStore.client.query('SELECT * FROM `group` WHERE universe_idUniverse = ?', id)
  }

  /**
   * @param { Number } idUser id of the user that we want the groups
   * @param { Number } idUniverse id of the universe that we want the groups for the user
   * @returns { Promise<Group[]> }
   */
  static async getByUserInUniverse (idUser, idUniverse) {
    return await mariadbStore.client.query(`
      SELECT g.idGroup, g.name, g.universe_idUniverse FROM \`group\` g
      INNER JOIN characterInGroup cg
        ON cg.group_idGroup = g.idGroup
      INNER JOIN \`character\` c
        ON c.idCharacter = cg.character_idCharacter
      WHERE c.user_idUser = ? AND g.universe_idUniverse = ?
    `, [idUser, idUniverse])
  }

  /// POST

  /**
   * @param { { name: String, idUniverse: Number } } group
   * @returns { Promise<Number> } the id of the new inserted group
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

  /// PUT

  /**
   * @param { Number } id id of the group
   * @param { { name: String } } group
   * @returns { Promise<Boolean> } if the group could have been updated
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

  /// DELETE

  /**
   * @param { Number } id id of the group
   * @returns { Promise<Boolean> } if the group could have been removed
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
