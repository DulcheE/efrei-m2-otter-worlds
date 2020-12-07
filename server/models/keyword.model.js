import hal from 'hal'
import { mariadbStore } from '../mariadb-store.js'
import { HalResource, HalResourceData, HalToOneLinks } from '../middlewares/hal-parser.js'

class HalResourceDataKeyword extends HalResourceData {
  /** @type { String } */
  name
}

class HalToOneLinksKeyword extends HalToOneLinks {
  /** @type { Number } */
  article
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

    this.data = new HalResourceDataKeyword()
    this.data.name = keyword.name || keyword.data.name

    this.toOneLinks = new HalToOneLinksKeyword()
    this.toOneLinks.article = keyword.article_idArticle || keyword.toOneLinks.article
  }

  /**
   * @param { String } baseAPI
   * @param { String } resourcePath
   */
  asResource (baseAPI) {
    const resource = hal.Resource({ name: this.data.name })
    resource.link('article', baseAPI + 'articles/' + this.toOneLinks.article)
    return resource
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
   * @param { Number } id id of the article
   * @returns { Promise<Keyword[]> }
   */
  static async getByArticle (id) {
    return await mariadbStore.client.query('SELECT * FROM keyword WHERE article_idArticle = ?', id)
  }

  /// POST

  /**
   * @param { { name: String, idArticle: Number } } keyword
   * @returns { Promise<Keyword> } the id of the new inserted keyword
   */
  static async add (keyword) {
    const sql = `
      INSERT INTO
        keyword(name, article_idArticle)
        VALUES(?, ?)
      RETURNING *`
    // All the params we have to put to insert a new row in the table
    const params = [keyword.name, keyword.idArticle]

    return new Keyword((await mariadbStore.client.query(sql, params))[0])
  }

  /// DELETE

  /**
   * @param { { name: String, idArticle: Number } } keyword
   * @returns { Promise<Boolean> } if the keyword could have been removed
   */
  static async remove (keyword) {
    const sql = `
      DELETE FROM keyword
        WHERE name = ? AND article_idArticle = ?`
    const params = [keyword.name, keyword.idArticle]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.affectedRows === 1
  }
}
