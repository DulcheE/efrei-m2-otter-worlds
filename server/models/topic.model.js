import mariadbStore from '../mariadb-store'
import { HalResource, HalResourceData, HalToOneLinks } from '../middlewares/hal-parser.js'

class HalResourceDataTopic extends HalResourceData {
  /** @type { String } */
  name
  /** @type { Number } */
  order
}

class HalToOneLinksTopic extends HalToOneLinks {
  /** @type { Number } */
  universe
  /** @type { Number } */
  article
}

export default class Topic extends HalResource {
  /** @type { HalResourceDataTopic } */
  data
  /** @type { HalToOneLinksTopic } */
  toOneLinks
  /** @type { String[] } */
  static toManyLinks = ['sub-topics']

  /**
   * @param { Topic } topic
   */
  constructor (topic) {
    super()

    this.id = topic.idTopic || topic.id

    this.data = new HalResourceDataTopic()
    this.data.name = topic.name || topic.data.name
    this.data.order = topic.order || topic.data.order

    this.toOneLinks = new HalToOneLinksTopic()
    this.toOneLinks.universe = topic.universe_idUniverse || topic.toOneLinks.universe
    this.toOneLinks.article = topic.article_idArticle || (topic.toOneLinks !== undefined) ? topic.toOneLinks.article : undefined
  }

  /**
   * @param { String } baseAPI
   * @param { String } resourcePath
   * @returns { hal.Resource }
   */
  asResource (baseAPI, resourcePath = 'topics') {
    return super.asResource(baseAPI, resourcePath)
  }

  /**
   * @param { String } baseAPI
   * @param { HalResource[] } list
   * @param { String } selfLink
   * @param { String } resourcePath
   */
  static asResourceList (baseAPI, list, selfLink = 'topics', resourcePath = 'topics') {
    return super.asResourceList(baseAPI, list, selfLink, resourcePath, Topic)
  }

  /**
   * @returns { Promise<Topic[]> }
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT * FROM topic')
  }

  /**
   * @param { Number } id
   * @returns { Promise<Topic> }
   */
  static async get (id) {
    const conn = (await mariadbStore.client.query('SELECT * FROM topic WHERE idTopic = ?', id))[0]
    if (!conn) {
      throw new Error(`Topic ${id} don't exist !`)
    }

    return new Topic(conn)
  }

  /**
   * @param { Number } id
   * @returns { Promise<SubTopics> }
   */
  static async getSubTopics (id) {
    return await mariadbStore.client.query('SELECT * FROM subTopic WHERE topic_idTopic = ?', id)
  }

  /**
   * @param { Topic } topic
   * @returns { Number } the id of the new inserted topic
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
   * @param {Number } id
   * @param { Topic } topic
   * @returns { Boolean } if the topic could have been updated
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
   * @param { Number } id
   * @returns { Boolean } if the topic could have been removed
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
