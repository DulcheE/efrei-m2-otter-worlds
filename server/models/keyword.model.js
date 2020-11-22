import { baseAPI } from '../routes/routes'
import mariadbStore from '../mariadb-store'
const hal = require('hal')

export default class Keyword {
  /** @type {Number} */
  idKeyword
  /** @type {String} */
  name

  /**
   * @param {Keyword} keyword
   */
  constructor (keyword) {
    this.idKeyword = keyword.idKeyword
    this.name = keyword.name
  }

  asResource (req) {
    // The data from the object
    const resource = hal.Resource(
      {
        id: this.idKeyword,
        name: this.name
      },
      `${baseAPI(req)}keywords/${this.idKeyword}`)

    // the links one to one and many to one
    resource.link('other',
      `${baseAPI(req)}others/${this.idOther}`)

    // the links one to many
    resource.link('otherOthers',
      `${baseAPI(req)}keywords/${this.idKeyword}/otherOthers`)

    return resource
  }

  /**
   * @param req
   * @param keywords {Keyword[]}
   * @param selfLink {string}
   */
  static asResourceList (req, keywords, selfLink = 'keywords') {
    const resourceKeywords = []
    for (const keyword of keywords) {
      const _keyword = new Keyword(keyword)
      resourceKeywords.push(_keyword.asResource(req).toJSON())
    }

    const resource = hal.Resource({ keywords: resourceKeywords }, baseAPI(req) + selfLink)

    return resource
  }

  /**
   * @returns {Promise<Keyword[]>}
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT * FROM keyword')
  }

  /**
   * @param {Number} id
   * @returns {Promise<Keyword[]>}
   */
  static async getAllForArticle (id) {
    return await mariadbStore.client.query('select * from keyword k left outer join keywordarticle ka on k.idKeyword = ka.keywords_idKeyword where ka.article_idArticle = ?', id)
  }

  /**
   * @param {Number} id
   * @returns {Promise<Keyword>}
   */
  static async get (id) {
    const conn = (await mariadbStore.client.query('SELECT * FROM keyword WHERE idKeyword = ?', id))[0]
    if (!conn) {
      throw new Error(`Keyword ${id} don't exist !`)
    }

    return new Keyword(conn)
  }

  /**
   * @param {Keyword} keyword
   * @returns {Number} the id of the new inserted keyword
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
   * @param {Number} id
   * @param {Keyword} keyword
   * @returns {Boolean} if the keyword could have been updated
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
   * @param {Number} id
   * @returns {Boolean} if the keyword could have been removed
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
