import { mariadbStore } from '../mariadb-store.js'
import { HalResource, HalResourceData, HalToOneLinks } from '../middlewares/hal-parser.js'

class HalResourceDataMap extends HalResourceData {
  /** @type { String } */
  name
}

class HalToOneLinksMap extends HalToOneLinks {
  /** @type { Number } */
  universe
  /** @type { Number } */
  article
}

export default class Map extends HalResource {
  /** @type { HalResourceDataMap } */
  data
  /** @type { HalToOneLinksMap } */
  toOneLinks
  /** @type { String[] } */
  static toManyLinks = ['interest-points']

  /**
   * @param { Map } map
   */
  constructor (map) {
    super()

    this.id = map.idMap || map.id

    this.data = new HalResourceDataMap()
    this.data.name = map.name || map.data.name

    this.toOneLinks = new HalToOneLinksMap()
    this.toOneLinks.universe = map.universe_idUniverse || map.toOneLinks.universe
    this.toOneLinks.article = map.article_idArticle || (map.toOneLinks !== undefined) ? map.toOneLinks.article : undefined
  }

  /**
   * @param { String } baseAPI
   * @param { String } resourcePath
   */
  asResource (baseAPI, resourcePath = 'maps') {
    return super.asResource(baseAPI, resourcePath)
  }

  /**
   * @param { String } baseAPI
   * @param { HalResource[] } list
   * @param { String } selfLink
   * @param { String } resourcePath
   */
  static asResourceList (baseAPI, list, selfLink = 'maps', resourcePath = 'maps') {
    return super.asResourceList(baseAPI, list, selfLink, resourcePath, Map)
  }

  /// GET

  /**
   * @returns { Promise<Map[]> }
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT * FROM map')
  }

  /**
   * @param { Number } id id of the map
   * @returns { Promise<Map> }
   */
  static async get (id) {
    return new Map((await mariadbStore.client.query('SELECT * FROM map WHERE idMap = ?', id))[0])
  }

  /**
   * @param { Number } id id of the universe
   * @returns { Promise<Map[]> }
   */
  static async getByUniverse (id) {
    return await mariadbStore.client.query('SELECT * FROM map WHERE universe_idUniverse = ?', id)
  }

  /// POST

  /**
   * @param { { name: String, idUniverse: Number, idArticle: Number? } } map
   * @returns { Promise<Map> } the id of the new inserted map
   */
  static async add (map) {
    const sql = `
      INSERT INTO
        map(name, universe_idUniverse, article_idArticle)
        VALUES(?, ?, ?)
      RETURNING *`
    // All the params we have to put to insert a new row in the table
    const params = [map.name, map.idUniverse, map.idArticle || null]

    return new Map((await mariadbStore.client.query(sql, params))[0])
  }

  /// PUT

  /**
   * @param { Number } id id of the map
   * @param { { name: String, idArticle: Number? } } map
   * @returns { Promise<Map> } if the map could have been updated
   */
  static async update (id, map) {
    const sql = `
      INSERT INTO
        map(idMap) VALUES(?)
      ON DUPLICATE KEY UPDATE
        name = ?, article_idArticle = ?
      RETURNING *`
    const params = [id, map.name, map.idArticle || null]

    return new Map((await mariadbStore.client.query(sql, params))[0])
  }

  /// DELETE

  /**
   * @param { Number } id id of the map
   * @returns { Promise<Number> } if the map could have been removed
   */
  static async remove (id) {
    const sql = `
      DELETE FROM map
        WHERE idMap = ?`
    const params = [id]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.affectedRows === 1
  }
}
