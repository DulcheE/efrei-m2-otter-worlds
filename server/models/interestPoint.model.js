import mariadbStore from '../mariadb-store'
import { HalResource, HalResourceData, HalToOneLinks } from '../middlewares/hal-parser.js'

class HalResourceDataInterestPoint extends HalResourceData {
  /** @type { String } */
  name
  /** @type { String } */
  coordinate
}

class HalToOneLinksInterestPoint extends HalToOneLinks {
  /** @type { Number } */
  map
  /** @type { Number } */
  article
}

export default class InterestPoint extends HalResource {
  /** @type { HalResourceDataInterestPoint } */
  data
  /** @type { HalToOneLinksInterestPoint } */
  toOneLinks
  /** @type { String[] } */
  static toManyLinks = []

  /**
   * @param { InterestPoint } interestPoint
   */
  constructor (interestPoint) {
    super()

    this.id = interestPoint.id_interestPoint || interestPoint.id

    this.data = new HalResourceDataInterestPoint()
    this.data.name = interestPoint.name || interestPoint.data.name
    this.data.coordinate = interestPoint.coordinate || interestPoint.data.coordinate

    this.toOneLinks = new HalToOneLinksInterestPoint()
    this.toOneLinks.map = interestPoint.map_idMap || interestPoint.toOneLinks.map
    this.toOneLinks.article = interestPoint.article_idArticle || (interestPoint.toOneLinks !== undefined) ? interestPoint.toOneLinks.article : undefined
  }

  /**
   * @param { String } baseAPI
   * @param { String } resourcePath
   * @returns { hal.Resource }
   */
  asResource (baseAPI, resourcePath = 'interest-points') {
    return super.asResource(baseAPI, resourcePath)
  }

  /**
   * @param { String } baseAPI
   * @param { HalResource[] } list
   * @param { String } selfLink
   * @param { String } resourcePath
   */
  static asResourceList (baseAPI, list, selfLink = 'interest-points', resourcePath = 'interest-points') {
    return super.asResourceList(baseAPI, list, selfLink, resourcePath, InterestPoint)
  }

  /**
   * @returns { Promise<InterestPoint[]> }
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT * FROM interestPoint')
  }

  /**
   * @param { Number } id
   * @returns { Promise<InterestPoint[]> }
   */
  static async getAllforMap (id) {
    return await mariadbStore.client.query('SELECT * FROM interestPoint WHERE map_idMap=?', id)
  }

  /**
   * @param { Number } id
   * @returns { Promise<InterestPoint[]> }
   */
  static async getAllforArticle (id) {
    return await mariadbStore.client.query('SELECT * FROM interestPoint WHERE article_idArticle=?', id)
  }

  /**
   * @param { Number } id
   * @returns { Promise<InterestPoint> }
   */
  static async get (id) {
    const conn = (await mariadbStore.client.query('SELECT * FROM interestPoint WHERE id_interestPoint = ?', id))[0]
    if (!conn) {
      throw new Error(`InterestPoint ${id} don't exist !`)
    }

    return new InterestPoint(conn)
  }

  /**
   * @param { InterestPoint } interestPoint
   * @returns { Number } the id of the new inserted interestPoint
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
   * @param { Number } id
   * @param { InterestPoint } interestPoint
   * @returns { Boolean } if the interestPoint could have been updated
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
   * @param { Number } id
   * @returns { Boolean } if the interestPoint could have been removed
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
