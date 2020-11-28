import { baseAPI } from '../api/routes'
import mariadbStore from '../mariadb-store'
const hal = require('hal')

export default class Article {
  /** @type {Number} */
  idArticle
  /** @type {String} */
  title
  /** @type {string} */
  content
  /** @type {string} */
  thumbnail
  /** @type {Number} */
  idSubTopic

  /**
   * @param {Article} article
   */
  constructor (article) {
    this.idArticle = article.idArticle
    this.title = article.title
    this.content = article.content
    this.thumbnail = article.thumbnail
    this.idSubTopic = article.idSubTopic || article.subtopic_idSubTopic
  }

  asResource (req) {
    // The data from the object
    const resource = hal.Resource(
      {
        id: this.idArticle,
        title: this.title,
        content: this.content,
        thumbnail: this.thumbnail
      },
      `${baseAPI(req)}Articles/${this.idArticle}`)

    // the links one to one and many to one
    resource.link('SubTopic',
      `${baseAPI(req)}SubTopics/${this.idSubTopic}`)

    // the links one to many
    resource.link('Maps',
      `${baseAPI(req)}Articles/${this.idArticle}/maps`)
    resource.link('Events',
       `${baseAPI(req)}Articles/${this.idArticle}/events`)
    resource.link('interestPoints',
      `${baseAPI(req)}Articles/${this.idArticle}/interestPoints`)

    return resource
  }

  /**
   * @param req
   * @param Articles {Article[]}
   * @param selfLink {string}
   */
  static asResourceList (req, Articles, selfLink = 'Articles') {
    const resourceArticles = []
    for (const article of Articles) {
      const _article = new Article(article)
      resourceArticles.push(_article.asResource(req).toJSON())
    }

    const resource = hal.Resource({ Articles: resourceArticles }, baseAPI(req) + selfLink)

    return resource
  }

  /**
   * @returns {Promise<Article[]>}
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT * FROM article')
  }

  /**
   * @param {Number} id
   * @returns {Promise<Article[]>}
   */
  static async getAllArticleForKeyword (id) {
    return await mariadbStore.client.query('select * from article a left outer join keywordarticle ka on a.idArticle = ka.article_idArticle where ka.keywords_idKeyword = ?', id)
  }

  /**
   * @param {Number} id
   * @returns {Promise<Article>}
   */
  static async get (id) {
    const conn = (await mariadbStore.client.query('SELECT * FROM article WHERE idArticle = ?', id))[0]
    if (!conn) {
      throw new Error(`Article ${id} don't exist !`)
    }

    return new Article(conn)
  }

  /**
   * @param {Article} article
   * @returns {Number} the id of the new inserted article
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
   * @param {Number} id
   * @param {Article} article
   * @returns {string} if the article could have been updated
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
   * @param {Number} id
   * @returns {string} if the article could have been removed
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
