import mariadbStore from '../mariadb-store'
import { HalResource, HalResourceData, HalToOneLinks } from '../middlewares/hal-parser.js'

class HalResourceDataArticle extends HalResourceData {
  /** @type { String } */
  title
  /** @type { String } */
  content
  /** @type { string } */
  thumbnail
}

class HalToOneLinksArticle extends HalToOneLinks {
  /** @type { Number } */
  subTopic
}

export default class Article extends HalResource {
  /** @type { HalResourceDataCharacter } */
  data
  /** @type { HalToOneLinksCharacter } */
  toOneLinks
  /** @type { String[] } */
  static toManyLinks = ['keywords']

  /**
   * @param { Article } article
   */
  constructor (article) {
    super()

    this.id = article.idArticle || article.id

    this.data = new HalResourceDataArticle()
    this.data.title = article.title || article.data.title
    this.data.content = article.content || article.data.content
    this.data.thumbnail = article.thumbnail || article.data.thumbnail

    this.toOneLinks = new HalToOneLinksArticle()
    this.toOneLinks.subTopic = article.subtopic_idSubTopic || article.toOneLinks.subTopic
  }

  /**
   * @param { String } baseAPI
   * @param { String } resourcePath
   * @returns { hal.Resource }
   */
  asResource (baseAPI, resourcePath = 'articles') {
    return super.asResource(baseAPI, resourcePath)
  }

  /**
   * @param { String } baseAPI
   * @param { HalResource[] } list
   * @param { String } selfLink
   * @param { String } resourcePath
   * @param { class } Classe
   */
  static asResourceList (baseAPI, list, selfLink = 'articles', resourcePath = 'articles') {
    return super.asResourceList(baseAPI, list, selfLink, resourcePath, Article)
  }

  /**
   * @returns { Promise<Article[]> }
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT * FROM article')
  }

  /**
   * @param { Number } id
   * @returns { Promise<Article[]> }
   */
  static async getAllArticleForKeyword (id) {
    return await mariadbStore.client.query('select * from article a left outer join keywordarticle ka on a.idArticle = ka.article_idArticle where ka.keywords_idKeyword = ?', id)
  }

  /**
   * @param { Number } id
   * @returns { Promise<Article> }
   */
  static async get (id) {
    const conn = (await mariadbStore.client.query('SELECT * FROM article WHERE idArticle = ?', id))[0]
    if (!conn) {
      throw new Error(`Article ${id} don't exist !`)
    }

    return new Article(conn)
  }

  /**
   * @param { Article } article
   * @returns { Number } the id of the new inserted article
   */
  static async add (article) {
    const sql = `
      INSERT INTO
        article(title, content, thumbnail, subtopic_idSubTopic)
        VALUES(?, ?, ?, ?)`
    // All the params we have to put to insert a new row in the table
    const params = [article.title, article.content, article.thumbnail, article.idSubTopic]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.insertId || -1
  }

  /**
   * @param { Number } id
   * @param { Article } article
   * @returns { Boolean } if the article could have been updated
   */
  static async update (id, article) {
    const sql = `
      UPDATE article
        SET title = ?, content = ?, thumbnail=?
        WHERE idArticle = ?`
    // All the cols you want to update for a article + the id of the article you want to update
    // /!\ You may never want to change the links
    const params = [article.title, article.content, article.thumbnail, id]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.affectedRows === 1
  }

  /**
   * @param { Number } id
   * @returns { Boolean } if the article could have been removed
   */
  static async remove (id) {
    const sql = `
      DELETE FROM article
        WHERE idArticle = ?`
    const params = [id]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.affectedRows === 1
  }
}
