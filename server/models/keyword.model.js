import mariadbStore from '../mariadb-store'
import { HalResource, HalResourceData, HalToOneLinks } from '../middlewares/hal-parser.js'

class HalResourceDataKeyword extends HalResourceData {
  /** @type { String } */
  name
}

class HalToOneLinksKeyword extends HalToOneLinks {
  /** @type { Number } */
  universe
}

export default class Keyword extends HalResource {
  /** @type { HalResourceDataKeyword } */
  data
  /** @type { HalToOneLinksKeyword } */
  toOneLinks
  /** @type { String[] } */
  static toManyLinks = []

  /**
   * @param { Keyword } keyword
   */
  constructor (keyword) {
    super()

    this.id = keyword.idKeyword || keyword.id

    this.data = new HalResourceDataKeyword()
    this.data.name = keyword.name || keyword.data.name

    this.toOneLinks = new HalToOneLinksKeyword()
    this.toOneLinks.universe = keyword.universe_idUniverse || keyword.toOneLinks.universe
  }

  /**
   * @param { String } baseAPI
   * @param { String } resourcePath
   */
  asResource (baseAPI, resourcePath = 'keywords') {
    return super.asResource(baseAPI, resourcePath)
  }

  /**
   * @param { String } baseAPI
   * @param { HalResource[] } list
   * @param { String } selfLink
   * @param { String } resourcePath
   */
  static asResourceList (baseAPI, list, selfLink = 'keywords', resourcePath = 'keywords') {
    return super.asResourceList(baseAPI, list, selfLink, resourcePath, Keyword)
  }

  /// GET

  /**
   * @returns { Promise<Keyword[]> }
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT * FROM keyword')
  }

  /**
   * @param { Number } id id of the keyword
   * @returns { Promise<Keyword> }
   */
  static async get (id) {
    return new Keyword((await mariadbStore.client.query('SELECT * FROM keyword WHERE idKeyword = ?', id))[0])
  }

  /**
   * @param { Number } id id of the universe
   * @returns { Promise<Keyword[]> }
   */
  static async getByUniverse (id) {
    return await mariadbStore.client.query('SELECT * FROM keyword WHERE universe_idUniverse = ?', id)
  }

  /**
   * @param { Number } id id of the article
   * @returns { Promise<Keyword[]> }
   */
  static async getByArticle (id) {
    return await mariadbStore.client.query(`
      SELECT * FROM keyword k
      LEFT OUTER JOIN keywordarticle ka
        ON k.idKeyword = ka.keywords_idKeyword
      WHERE ka.article_idArticle = ?
    `, id)
  }

  /// POST

  /**
   * @param { {name: String, idUniverse: Number} } keyword
   * @returns { Promise<Keyword> } the id of the new inserted keyword
   */
  static async add (keyword) {
    const sql = `
      INSERT INTO
        keyword(name, universe_idUniverse)
        VALUES(?)
      RETURNING *`
    // All the params we have to put to insert a new row in the table
    const params = [keyword.name, keyword.idUniverse]

    return new Keyword((await mariadbStore.client.query(sql, params))[0])
  }

  /// DELETE

  /**
   * @param { Number } id id of the article
   * @returns { Promise<Boolean> } if the keyword could have been removed
   */
  static async remove (id) {
    const sql = `
      DELETE FROM keyword
        WHERE idKeyword = ?`
    const params = [id]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.affectedRows === 1
  }
}
