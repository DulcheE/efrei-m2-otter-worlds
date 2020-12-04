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
  static toManyLinks = ['groups', 'characters', 'maps', 'template-categories', 'timelines', 'topics', 'users-playing', 'keywords']

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

  /// GET

  /**
   * @returns { Promise<Universe[]> }
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT * FROM universe')
  }

  /**
   * @param { Number } id id of the universe
   * @returns { Promise<Universe> }
   */
  static async get (id) {
    return new Universe((await mariadbStore.client.query('SELECT * FROM universe WHERE idUniverse = ?', id))[0])
  }

  /**
   * @param { Number } id id of the user
   * @returns { Promise<Universe[]> }
   */
  static async getByUser (id) {
    return await mariadbStore.client.query('SELECT * FROM `universe` WHERE user_idUser = ?', id)
  }

  /**
   * @param { Number } id id of the user
   * @returns { Promise<Universe[]> }
   */
  static async getByUserIsPlayingIn (id) {
    return await mariadbStore.client.query(`
      SELECT u.*, uin.bIsGM FROM universe u
      INNER JOIN userinuniverse uin
        ON uin.idUniverse = u.idUniverse
      WHERE idUser = ?
    `, id)
  }

  /// POST

  /**
   * @param { { name: String, description: String, bIsPublic: Boolean?, idUser: Number } } universe
   * @returns { Promise<Universe> } the id of the new inserted universe
   */
  static async add (universe) {
    const sql = `
      INSERT INTO 
        universe(name, description, bIsPublic, user_idUser) 
        VALUES(?, ?, ?, ?)
      RETURNING *`
    const params = [universe.name, universe.description, universe.bIsPublic, universe.idUser]

    return new Universe((await mariadbStore.client.query(sql, params))[0])
  }

  /**
   * @param { Number } idUniverse
   * @param { Number } idUser
   * @param { Number } bIsGM
   * @returns { Promise<Boolean> } the id of the new inserted universe
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

  /// PUT

  /**
   * @param { Number } id id of the universe
   * @param { { name: String, description: String, bIsPublic: Boolean } } universe
   * @returns { Promise<Universe> } if the universe could have been updated
   */
  static async update (id, universe) {
    const sql = `
      INSERT INTO
        universe(idUniverse) VALUES(?)
      ON DUPLICATE KEY UPDATE
        name = ?, description = ?, bIsPublic = ?
      RETURNING *`
    const params = [id, universe.name, universe.description, universe.bIsPublic]

    return new Universe((await mariadbStore.client.query(sql, params))[0])
  }

  /**
   * @param { Number } idUniverse
   * @param { Number } idUser
   * @param { Boolean } bIsGM
   * @returns { Promise<Boolean> } if the universe could have been updated
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

  /// DELETE

  /**
   * @param { Number } id id of the universe
   * @returns { Promise<Boolean> } if the universe could have been removed
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
   * @returns { Promise<Boolean> } if the universe could have been removed
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
