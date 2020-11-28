import { baseAPI } from '../api/routes'
import mariadbStore from '../mariadb-store'
const hal = require('hal')

export default class InterestPoint {
  /** @type {Number} */
  idInterestPoint
  /** @type {String} */
  name
  /** @type {String} */
  coordinate
  /** @type {Number} */
  idMap
  /** @type {Number} */
  idArticle

  /**
   * @param {InterestPoint} interestPoint
   */
  constructor (interestPoint) {
    this.idInterestPoint = interestPoint.idInterestPoint || interestPoint.id_interestPoint
    this.name = interestPoint.name
    this.coordinate = interestPoint.coordinate
    this.idMap = interestPoint.idMap || interestPoint.map_idMap
    this.idArticle = interestPoint.idArticle || interestPoint.article_idArticle
  }

  asResource (req) {
    // The data from the object
    const resource = hal.Resource(
      {
        id: this.idInterestPoint,
        name: this.name,
        coordinate: this.coordinate
      },
      `${baseAPI(req)}interestPoints/${this.idInterestPoint}`)

    // the links one to one and many to one
    resource.link('Map',
      `${baseAPI(req)}Maps/${this.idMap}`)
    resource.link('Article',
      `${baseAPI(req)}Articles/${this.idArticle}`)

    return resource
  }

  /**
   * @param req
   * @param interestPoints {InterestPoint[]}
   * @param selfLink {string}
   */
  static asResourceList (req, interestPoints, selfLink = 'interestPoints') {
    const resourceInterestPoints = []
    for (const interestPoint of interestPoints) {
      const _interestPoint = new InterestPoint(interestPoint)
      resourceInterestPoints.push(_interestPoint.asResource(req).toJSON())
    }

    const resource = hal.Resource({ interestPoints: resourceInterestPoints }, baseAPI(req) + selfLink)

    return resource
  }

  /**
   * @returns {Promise<InterestPoint[]>}
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT * FROM interestPoint')
  }

  /**
   * @param {Number} id
   * @returns {Promise<InterestPoint[]>}
   */
  static async getAllforMap (id) {
    return await mariadbStore.client.query('SELECT * FROM interestPoint WHERE map_idMap=?', id)
  }

  /**
   * @param {Number} id
   * @returns {Promise<InterestPoint[]>}
   */
  static async getAllforArticle (id) {
    return await mariadbStore.client.query('SELECT * FROM interestPoint WHERE article_idArticle=?', id)
  }

  /**
   * @param {Number} id
   * @returns {Promise<InterestPoint>}
   */
  static async get (id) {
    const conn = (await mariadbStore.client.query('SELECT * FROM interestPoint WHERE id_interestPoint = ?', id))[0]
    if (!conn) {
      throw new Error(`InterestPoint ${id} don't exist !`)
    }

    return new InterestPoint(conn)
  }

  /**
   * @param {InterestPoint} interestPoint
   * @returns {Number} the id of the new inserted interestPoint
   */
  static async add (interestPoint) {
    const sql = `
      INSERT INTO
        interestPoint(name, coordinate, map_idMap, article_idArticle)
        VALUES(?, ?, ?, ?)`
    // All the params we have to put to insert a new row in the table
    const params = [interestPoint.name, interestPoint.coordinate, interestPoint.idMap, interestPoint.idArticle]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.insertId || -1
  }

  /**
   * @param {Number} id
   * @param {InterestPoint} interestPoint
   * @returns {Boolean} if the interestPoint could have been updated
   */
  static async update (id, interestPoint) {
    const sql = `
      UPDATE interestPoint
        SET name = ?, coordinate = ?
        WHERE id_interestPoint = ?`
    // All the cols you want to update for a interestPoint + the id of the interestPoint you want to update
    // /!\ You may never want to change the links
    const params = [interestPoint.name, interestPoint.coordinate, id]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.affectedRows === 1
  }

  /**
   * @param {Number} id
   * @returns {Boolean} if the interestPoint could have been removed
   */
  static async remove (id) {
    const sql = `
      DELETE FROM interestPoint
        WHERE id_interestPoint = ?`
    const params = [id]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.affectedRows === 1
  }
}
