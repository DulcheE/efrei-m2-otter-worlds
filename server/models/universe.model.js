import mariadbStore from '../mariadb-store'
import { HalResource, HalResourceData, HalToOneLinks } from '../middlewares/hal-parser.js'

class HalResourceDataUniverse extends HalResourceData {
  /** @type { String } */
  name
  /** @type { String } */
  description
  /** @type { Boolean } */
  bIsPublic
}

class HalToOneLinksUniverse extends HalToOneLinks {
  /** @type { Number } */
  user
}

export default class Universe extends HalResource {
  /** @type { HalResourceDataUniverse } */
  data
  /** @type { HalToOneLinksUniverse } */
  toOneLinks
  /** @type { String[] } */
  static toManyLinks = ['groups', 'characters', 'maps', 'template-categories', 'timelines', 'topics', 'users-playing']

  /**
   * @param { Universe } universe
   */
  constructor (universe) {
    super()

    this.id = universe.idUniverse || universe.id

    this.data = new HalResourceDataUniverse()
    this.data.name = universe.name || universe.data.name
    this.data.description = universe.description || universe.data.description
    this.data.bIsPublic = (universe.bIsPublic !== universe) ? !!universe.bIsPublic : universe.data.bIsPublic

    this.toOneLinks = new HalToOneLinksUniverse()
    this.toOneLinks.user = universe.user_idUser || universe.toOneLinks.user
  }

  /**
   * @param { String } baseAPI
   * @param { String } resourcePath
   */
  asResource (baseAPI, resourcePath = 'universes') {
    return super.asResource(baseAPI, resourcePath)
  }

  /**
   * @param { String } baseAPI
   * @param { HalResource[] } list
   * @param { String } selfLink
   * @param { String } resourcePath
   */
  static asResourceList (baseAPI, list, selfLink = 'universes', resourcePath = 'universes') {
    return super.asResourceList(baseAPI, list, selfLink, resourcePath, Universe)
  }

  /**
   * @returns { Promise<Universe[]> }
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT * FROM universe')
  }

  /**
   * @param { Number } id
   * @returns { Promise<Universe> }
   */
  static async get (id) {
    const rows = (await mariadbStore.client.query('SELECT * FROM universe WHERE idUniverse = ?', id))[0]
    if (!rows) {
      throw new Error(`Universe ${id} don't exist !`)
    }

    return new Universe(rows)
  }

  /**
   * @param { Number } id
   * @returns { Promise<import('./character.model.js').default[]> }
   */
  static async getCharacters (id) {
    return await mariadbStore.client.query('SELECT * FROM `character` WHERE universe_idUniverse = ?', id)
  }

  /**
   * @param { Number } id
   * @returns { Promise<import('./templateCategory.model.js').default[]> }
   */
  static async getTemplateCategories (id) {
    return await mariadbStore.client.query('SELECT * FROM templateCategory WHERE universe_idUniverse = ?', id)
  }

  /**
   * @param { Number } id
   * @returns { Promise<import('./character.model.js').default[]> }
   */
  static async getUsersPlaying (id) {
    return await mariadbStore.client.query(`
      SELECT u.*, uin.bIsGM FROM user u
      INNER JOIN userinuniverse uin
        ON uin.idUser = u.idUser
      WHERE idUniverse = ?
    `, id)
  }

  /**
   * @param { Universe } universe
   * @returns { Number } the id of the new inserted universe
   */
  static async add (universe) {
    const sql = `
      INSERT INTO 
        universe(name, description, bIsPublic, user_idUser) 
        VALUES(?, ?, ?, ?)`
    const params = [universe.name, universe.description, !!universe.bIsPublic, universe.idUser]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.insertId || -1
  }

  /**
   * @param { Number } idUniverse
   * @param { Number } idUser
   * @param { Number } bIsGM
   * @returns { Boolean } the id of the new inserted universe
   */
  static async inviteUser (idUniverse, idUser, bIsGM) {
    const sql = `
      INSERT INTO 
        userInvitation(user_idUser, universe_idUniverse, bIsGM) 
        VALUES(?, ?, ?)`
    const params = [idUser, idUniverse, !!bIsGM]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.affectedRows || false
  }

  /**
   * @param { Number } id
   * @param { Universe } universe
   * @returns { Boolean } if the universe could have been updated
   */
  static async update (id, universe) {
    const sql = `
      UPDATE universe
        SET name = ?, description = ?, bIsPublic = ?
        WHERE idUniverse = ?`
    const params = [universe.name, universe.description, universe.bIsPublic, id]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.affectedRows === 1
  }

  /**
   * @param { Number } idUniverse
   * @param { Number } idUser
   * @param { Boolean } bIsGM
   * @returns { Boolean } if the universe could have been updated
   */
  static async updateUserRole (idUniverse, idUser, bIsGM) {
    const sql = `
      UPDATE userInvitation
        SET bIsGM = ?
        WHERE universe_idUniverse = ? AND user_idUser = ?`
    const params = [bIsGM, idUniverse, idUser]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.affectedRows === 1
  }

  /**
   * @param { Number } id
   * @returns { Boolean } if the universe could have been removed
   */
  static async remove (id) {
    const sql = `
      DELETE FROM universe
        WHERE idUniverse = ?`
    const params = [id]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.affectedRows === 1
  }

  /**
   * @param { Number } idUniverse
   * @param { Number } idUser
   * @returns { Boolean } if the universe could have been removed
   */
  static async kickUser (idUniverse, idUser) {
    const sql = `
      DELETE FROM userInvitation
        WHERE universe_idUniverse = ? AND user_idUser = ?`
    const params = [idUniverse, idUser]

    const rows = await mariadbStore.client.query(sql, params)

    if (rows.affectedRows !== 1) { return false }

    const sql2 = `
      DELETE FROM \`character\`
        WHERE universe_idUniverse = ? AND user_idUser = ?
    `
    const params2 = [idUniverse, idUser]

    await mariadbStore.client.query(sql2, params2)

    return true
  }
}
