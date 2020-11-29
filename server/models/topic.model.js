import { baseAPI } from '../api/routes'
import mariadbStore from '../mariadb-store'
const hal = require('hal')

export default class Topic {
  /** @type {Number} */
  idTopic
  /** @type {String} */
  name
  /** @type {Number} */
  order
  /** @type {Number} */
  idUniverse
  /** @type {Number} */
  idArticle

  /**
   * @param {Topic} topic
   */
  constructor (topic) {
    this.idTopic = topic.idTopic
    this.name = topic.name
    this.order = topic.order
    this.idUniverse = topic.universe_idUniverse || topic.idUniverse
    this.idArticle = topic.article_idArticle || topic.idArticle
  }

  asResource (req) {
    // The data from the object
    const resource = hal.Resource(
      {
        id: this.idTopic,
        name: this.name,
        order: this.order
      },
      `${baseAPI(req)}topics/${this.idTopic}`)

    // the links one to one and many to one
    resource.link('universe',
    `${baseAPI(req)}universes/${this.idUniverse}`)

    if (this.idArticle) {
      resource.link('article',
      `${baseAPI(req)}articles/${this.idArticle}`)
    }

    // the links one to many
    resource.link('sub-topics',
    `${baseAPI(req)}topics/${this.idTopic}/sub-topics`)

    return resource
  }

  /**
   * @param req
   * @param topics {Topic[]}
   * @param selfLink {string}
   */
  static asResourceList (req, topics, selfLink = 'topics') {
    const resourceTopics = []
    for (const topic of topics) {
      const _topic = new Topic(topic)
      resourceTopics.push(_topic.asResource(req).toJSON())
    }

    const resource = hal.Resource({ topics: resourceTopics }, baseAPI(req) + selfLink)

    return resource
  }

  /**
   * @returns {Promise<Topic[]>}
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT * FROM topic')
  }

  /**
   * @param {Number} id
   * @returns {Promise<Topic>}
   */
  static async get (id) {
    const conn = (await mariadbStore.client.query('SELECT * FROM topic WHERE idTopic = ?', id))[0]
    if (!conn) {
      throw new Error(`Topic ${id} don't exist !`)
    }

    return new Topic(conn)
  }

  /**
   * @param {Number} id
   * @returns {Promise<SubTopics>}
   */
  static async getSubTopics (id) {
    return await mariadbStore.client.query('SELECT * FROM subTopic WHERE topic_idTopic = ?', id)
  }

  /**
   * @param {Topic} topic
   * @returns {Number} the id of the new inserted topic
   */
  static async add (topic) {
    let sql = ''
    let params = []

    if (topic.idArticle) {
      sql = `
      INSERT INTO 
        topic(name, \`order\`, universe_idUniverse, article_idArticle) 
        VALUES(?, ?, ?, ?)`
      params = [topic.name, topic.order, topic.idUniverse, topic.idArticle]
    } else {
      sql = `
      INSERT INTO 
        topic(name, \`order\`, universe_idUniverse) 
        VALUES(?, ?, ?)`
      params = [topic.name, topic.order, topic.idUniverse]
    }

    const rows = await mariadbStore.client.query(sql, params)

    return rows.insertId || -1
  }

  /**
   * @param {Number} id
   * @param {Topic} topic
   * @returns {Boolean} if the topic could have been updated
   */
  static async update (id, topic) {
    let sql = ''
    let params = []

    if (topic.idArticle) {
      sql = `
      UPDATE topic
        SET name = ?, \`order\` = ?, article_idArticle = ?
        WHERE idTopic = ?`
      params = [topic.name, topic.order, topic.idArticle, id]
    } else {
      sql = `
      UPDATE topic
        SET name = ?, \`order\` = ?
        WHERE idTopic = ?`
      params = [topic.name, topic.order, id]
    }

    const rows = await mariadbStore.client.query(sql, params)

    return rows.affectedRows === 1
  }

  /**
   * @param {Number} id
   * @returns {Boolean} if the topic could have been removed
   */
  static async remove (id) {
    const sql = `
      DELETE FROM topic
        WHERE idTopic = ?`
    const params = [id]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.affectedRows === 1
  }
}
