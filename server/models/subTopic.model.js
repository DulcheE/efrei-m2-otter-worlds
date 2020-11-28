import { baseAPI } from '../api/routes'
import mariadbStore from '../mariadb-store'
const hal = require('hal')

export default class SubTopic {
  /** @type {Number} */
  idSubTopic
  /** @type {String} */
  name
  /** @type {Number} */
  order
  /** @type {Number} */
  idTopic
  /** @type {Number} */
  idArticle

  /**
   * @param {SubTopic} subTopic
   */
  constructor (subTopic) {
    this.idSubTopic = subTopic.idSubTopic
    this.name = subTopic.name
    this.order = subTopic.order
    this.idTopic = subTopic.topic_idTopic || subTopic.idTopic
    this.idArticle = subTopic.article_idArticle || subTopic.idArticle
  }

  asResource (req) {
    // The data from the object
    const resource = hal.Resource(
      {
        id: this.idSubTopic,
        name: this.name,
        order: this.order
      },
      `${baseAPI(req)}sub-topics/${this.idSubTopic}`)

    // the links one to one and many to one
    resource.link('topic',
    `${baseAPI(req)}topics/${this.idTopic}`)

    if (this.idArticle) {
      resource.link('article',
      `${baseAPI(req)}articles/${this.idArticle}`)
    }

    // the links one to many
    resource.link('articles',
    `${baseAPI(req)}sub-topics/${this.idSubTopic}/articles`)

    return resource
  }

  /**
   * @param req
   * @param subTopics {SubTopic[]}
   * @param selfLink {string}
   */
  static asResourceList (req, subTopics, selfLink = 'sub-topics') {
    const resourceSubTopics = []
    for (const subTopic of subTopics) {
      const _subTopic = new SubTopic(subTopic)
      resourceSubTopics.push(_subTopic.asResource(req).toJSON())
    }

    const resource = hal.Resource({ subTopics: resourceSubTopics }, baseAPI(req) + selfLink)

    return resource
  }

  /**
   * @returns {Promise<SubTopic[]>}
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT * FROM subTopic')
  }

  /**
   * @param {Number} id
   * @returns {Promise<SubTopic>}
   */
  static async get (id) {
    const conn = (await mariadbStore.client.query('SELECT * FROM subTopic WHERE idSubTopic = ?', id))[0]
    if (!conn) {
      throw new Error(`SubTopic ${id} don't exist !`)
    }

    return new SubTopic(conn)
  }

  /**
   * @param {SubTopic} subTopic
   * @returns {Number} the id of the new inserted subTopic
   */
  static async add (subTopic) {
    let sql = ''
    let params = []

    if (subTopic.idArticle) {
      sql = `
      INSERT INTO 
        subTopic(name, \`order\`, topic_idTopic, article_idArticle) 
        VALUES(?, ?, ?, ?)`
      params = [subTopic.name, subTopic.order, subTopic.idTopic, subTopic.idArticle]
    } else {
      sql = `
      INSERT INTO 
        subTopic(name, \`order\`, topic_idTopic) 
        VALUES(?, ?, ?)`
      params = [subTopic.name, subTopic.order, subTopic.idTopic]
    }

    const rows = await mariadbStore.client.query(sql, params)

    return rows.insertId || -1
  }

  /**
   * @param {Number} id
   * @param {SubTopic} subTopic
   * @returns {Boolean} if the subTopic could have been updated
   */
  static async update (id, subTopic) {
    let sql = ''
    let params = []

    if (subTopic.idArticle) {
      sql = `
      UPDATE subTopic
        SET name = ?, \`order\` = ?, article_idArticle = ?
        WHERE idSubTopic = ?`
      params = [subTopic.name, subTopic.order, subTopic.idArticle, id]
    } else {
      sql = `
      UPDATE subTopic
        SET name = ?, \`order\` = ?
        WHERE idSubTopic = ?`
      params = [subTopic.name, subTopic.order, id]
    }

    const rows = await mariadbStore.client.query(sql, params)

    return rows.affectedRows === 1
  }

  /**
   * @param {Number} id
   * @returns {Boolean} if the subTopic could have been removed
   */
  static async remove (id) {
    const sql = `
      DELETE FROM subTopic
        WHERE idSubTopic = ?`
    const params = [id]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.affectedRows === 1
  }
}
