import { baseAPI } from '../api/routes'
import mariadbStore from '../mariadb-store'
const hal = require('hal')

export default class Universe {
  /** @type {Number} */
  idUniverse
  /** @type {String} */
  name
  /** @type {String} */
  description
  /** @type {Boolean} */
  bIsPublic
  /** @type {Number} */
  idUser

  /**
   * @param {Universe} universe
   */
  constructor (universe) {
    this.idUniverse = universe.idUniverse
    this.name = universe.name
    this.description = universe.description
    this.bIsPublic = universe.bIsPublic
    this.idUser = universe.user_idUser || universe.idUser
  }

  /**
   * @param {import('express').Request} req
   */
  asResource (req) {
    const resource = hal.Resource(
      {
        id: this.idUniverse,
        name: this.name,
        description: this.description,
        bIsPublic: !!this.bIsPublic
      },
      `${baseAPI(req)}universes/${this.idUniverse}`)

    resource.link('user',
      `${baseAPI(req)}users/${this.idUser}`)

    resource.link('characters',
      `${baseAPI(req)}universes/${this.idUniverse}/characters`)
    resource.link('maps',
      `${baseAPI(req)}universes/${this.idUniverse}/maps`)
    resource.link('template-categories',
      `${baseAPI(req)}universes/${this.idUniverse}/template-categories`)
    resource.link('timelines',
      `${baseAPI(req)}universes/${this.idUniverse}/timelines`)
    resource.link('topics',
      `${baseAPI(req)}universes/${this.idUniverse}/topics`)
    resource.link('usersPlaying',
      `${baseAPI(req)}universes/${this.idUniverse}/users-playing`)

    return resource
  }

  /**
   * @param {import('express').Request} req
   * @param {Universe[]} universes
   * @param {string} selfLink
   */
  static asResourceList (req, universes, selfLink = 'universes') {
    const resourceUniverses = []
    for (const universe of universes) {
      const _universe = new Universe(universe)
      resourceUniverses.push(_universe.asResource(req).toJSON())
    }

    const resource = hal.Resource({ universes: resourceUniverses }, baseAPI(req) + selfLink)

    return resource
  }

  /**
   * @returns {Promise<Universe[]>}
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT * FROM universe')
  }

  /**
   * @param {Number} id
   * @returns {Promise<Universe>}
   */
  static async get (id) {
    const rows = (await mariadbStore.client.query('SELECT * FROM universe WHERE idUniverse = ?', id))[0]
    if (!rows) {
      throw new Error(`Universe ${id} don't exist !`)
    }

    return new Universe(rows)
  }

  /**
   * @param {Number} id
   * @returns {Promise<import('./character.model.js').default[]>}
   */
  static async getCharacters (id) {
    return await mariadbStore.client.query('SELECT * FROM `character` WHERE universe_idUniverse = ?', id)
  }

  /**
   * @param {Number} id
   * @returns {Promise<import('./templateCategory.model.js').default[]>}
   */
  static async getTemplateCategories (id) {
    return await mariadbStore.client.query('SELECT * FROM templateCategory WHERE universe_idUniverse = ?', id)
  }

  /**
   * @param {Number} id
   * @returns {Promise<import('./character.model.js').default[]>}
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
   * @param {Universe} universe
   * @returns {Number} the id of the new inserted universe
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
   * @param {Number} idUniverse
   * @param {Number} idUser
   * @param {Number} bIsGM
   * @returns {Boolean} the id of the new inserted universe
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
   * @param {Number} id
   * @param {Universe} universe
   * @returns {Boolean} if the universe could have been updated
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
   * @param {Number} idUniverse
   * @param {Number} idUser
   * @param {Boolean} bIsGM
   * @returns {Boolean} if the universe could have been updated
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
   * @param {Number} id
   * @returns {Boolean} if the universe could have been removed
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
   * @param {Number} idUniverse
   * @param {Number} idUser
   * @returns {Boolean} if the universe could have been removed
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
