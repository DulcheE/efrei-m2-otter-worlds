import { mariadbStore } from '../mariadb-store.js'
import { HalResource, HalResourceData, HalToOneLinks } from '../middlewares/hal-parser.js'

class HalResourceDataArticle extends HalResourceData {
  /** @type { String } */
  title
  /** @type { String } */
  content
  /** @type { String? } */
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
    this.data.thumbnail = (article.thumbnail !== undefined) ? article.thumbnail : article.data.thumbnail

    this.toOneLinks = new HalToOneLinksArticle()
    this.toOneLinks.subTopic = article.subTopic_idSubTopic || article.toOneLinks.subTopic
  }

  /**
   * @param { String } baseAPI
   * @param { String } resourcePath
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

  /// GET

  /**
   * @returns { Promise<Article[]> }
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT * FROM article')
  }

  /**
   * @param { Number } id id of the article
   * @returns { Promise<Article> }
   */
  static async get (id) {
    return new Article((await mariadbStore.client.query('SELECT * FROM article WHERE idArticle = ?', id))[0])
  }

  /**
   * @param { Number } id id of the subTopic
   * @returns { Promise<Article[]> }
   */
  static async getBySubTopic (id) {
    return await mariadbStore.client.query('SELECT * FROM article WHERE subTopic_idSubTopic = ?', id)
  }

  /**
   * @param { Number } idUniverse id of the universe
   * @param { String } keyword name of the keyword
   * @returns { Promise<Article[]> }
   */
  static async getByKeyword (idUniverse, keyword) {
    return await mariadbStore.client.query(`
      SELECT a.* FROM article a
      INNER JOIN subTopic st
        ON st.idSubTopic = a.subTopic_idSubTopic
      INNER JOIN topic t
        ON t.idTopic = st.topic_idTopic
      INNER JOIN universe u
        ON u.idUniverse = t.universe_idUniverse
      INNER JOIN keyword k
        ON k.article_idArticle = a.idArticle
      WHERE u.idUniverse = ? AND k.name = ?
    `, [idUniverse, keyword])
  }

  /// POST

  /**
   * @param { { title: String, content: String, thumbnail: String?, idSubTopic: Number? } } article
   * @returns { Promise<Article> } the id of the new inserted article
   */
  static async add (article) {
    const sql = `
      INSERT INTO
        article(title, content, thumbnail, subtopic_idSubTopic)
        VALUES(?, ?, ?, ?)
      RETURNING *`
    // All the params we have to put to insert a new row in the table
    const params = [article.title, article.content, article.thumbnail || null, article.idSubTopic || null]

    return new Article((await mariadbStore.client.query(sql, params))[0])
  }

  /// PUT

  /**
   * @param { Number } id id of the article
   * @param { { title: String, content: String, thumbnail: String } } article
   * @returns { Promise<Article> } if the article could have been updated
   */
  static async update (id, article) {
    const sql = `
      INSERT INTO
        article(idArticle) VALUES(?)
      ON DUPLICATE KEY UPDATE
        title = ?, content = ?, thumbnail = ?
      RETURNING *`
    const params = [id, article.title, article.content, article.thumbnail]

    return new Article((await mariadbStore.client.query(sql, params))[0])
  }

  /// DELETE

  /**
   * @param { Number } id id of the article
   * @returns { Promise<Boolean> } if the article could have been removed
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
