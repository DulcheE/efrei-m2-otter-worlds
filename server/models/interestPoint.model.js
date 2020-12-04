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

  /// GET

  /**
   * @returns { Promise<InterestPoint[]> }
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT * FROM interestPoint')
  }

  /**
   * @param { Number } id id of the interestPoint
   * @returns { Promise<InterestPoint> }
   */
  static async get (id) {
    return new InterestPoint((await mariadbStore.client.query('SELECT * FROM interestPoint WHERE id_interestPoint = ?', id))[0])
  }

  /**
   * @param { Number } id id of the map
   * @returns { Promise<InterestPoint[]> }
   */
  static async getByMap (id) {
    return await mariadbStore.client.query('SELECT * FROM interestPoint WHERE map_idMap=?', id)
  }

  /// POST

  /**
   * @param { { name: String, coordinate: String, idMap: Number, idArticle: Number? } } interestPoint
   * @returns { Promise<InterestPoint> } the id of the new inserted interestPoint
   */
  static async add (interestPoint) {
    const sql = `
      INSERT INTO
        interestPoint(name, coordinate, map_idMap, article_idArticle)
        VALUES(?, ?, ?, ?)
      RETURNING *`
    // All the params we have to put to insert a new row in the table
    const params = [interestPoint.name, interestPoint.coordinate, interestPoint.idMap, interestPoint.idArticle || null]

    return new InterestPoint((await mariadbStore.client.query(sql, params))[0])
  }

  /// PUT

  /**
   * @param { Number } id id of the interestPoint
   * @param { { name: String, coordinate: String, idArticle: Number? } } interestPoint
   * @returns { Promise<InterestPoint> } if the interestPoint could have been updated
   */
  static async update (id, interestPoint) {
    const sql = `
      INSERT INTO
        interestPoint(idInterestPoint) VALUES(?)
      ON DUPLICATE KEY UPDATE
        name = ?, coordinate = ?, article_idArticle = ?
      RETURNING *`
    const params = [id, interestPoint.name, interestPoint.coordinate, interestPoint.idArticle || null]

    return InterestPoint((await mariadbStore.client.query(sql, params))[0])
  }

  /// DELETE

  /**
   * @param { Number } id id of the interestPoint
   * @returns { Promise<Boolean> } if the interestPoint could have been removed
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
