import mariadbStore from '../mariadb-store'
import { HalResource, HalResourceData, HalToOneLinks } from '../middlewares/hal-parser.js'

class HalResourceDataKeyword extends HalResourceData {
  /** @type { String } */
  name
}

class HalToOneLinksKeyword extends HalToOneLinks { }

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
  }

  /**
   * @param { String } baseAPI
   * @param { String } resourcePath
   * @returns { hal.Resource }
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

  /**
   * @returns { Promise<Keyword[]> }
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT * FROM keyword')
  }

  /**
   * @param { Number } id
   * @returns { Promise<Keyword[]> }
   */
  static async getAllForArticle (id) {
    return await mariadbStore.client.query('select * from keyword k left outer join keywordarticle ka on k.idKeyword = ka.keywords_idKeyword where ka.article_idArticle = ?', id)
  }

  /**
   * @param { Number } id
   * @returns { Promise<Keyword> }
   */
  static async get (id) {
    const conn = (await mariadbStore.client.query('SELECT * FROM keyword WHERE idKeyword = ?', id))[0]
    if (!conn) {
      throw new Error(`Keyword ${id} don't exist !`)
    }

    return new Keyword(conn)
  }

  /**
   * @param { Keyword } keyword
   * @returns { Number } the id of the new inserted keyword
   */
  static async add (keyword) {
    const sql = `
      INSERT INTO
        keyword(name)
        VALUES(?)`
    // All the params we have to put to insert a new row in the table
    const params = [keyword.name]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.insertId || -1
  }

  /**
   * @param { Number } id
   * @param { Keyword } keyword
   * @returns { Boolean } if the keyword could have been updated
   */
  static async update (id, keyword) {
    const sql = `
      UPDATE keyword
        SET name = ?
        WHERE idKeyword = ?`
    // All the cols you want to update for a keyword + the id of the keyword you want to update
    // /!\ You may never want to change the links
    const params = [keyword.name, id]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.affectedRows === 1
  }

  /**
   * @param { Number } id
   * @returns { Boolean } if the keyword could have been removed
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
