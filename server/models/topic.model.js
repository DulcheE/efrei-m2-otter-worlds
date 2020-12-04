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

  /// GET

  /**
   * @returns { Promise<Topic[]> }
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT * FROM topic')
  }

  /**
   * @param { Number } id id of the topic
   * @returns { Promise<Topic> }
   */
  static async get (id) {
    return new Topic((await mariadbStore.client.query('SELECT * FROM topic WHERE idTopic = ?', id))[0])
  }

  /**
   * @param { Number } id id of the universe
   * @returns { Promise<Topic[]> }
   */
  static async getByUniverse (id) {
    return await mariadbStore.client.query('SELECT * FROM topic WHERE universe_idUniverse = ?', id)
  }

  /// POST

  /**
   * @param { { name: String, order: Number, idUniverse: Number, idArticle: Number? } } topic
   * @returns { Promise<Topic> } the id of the new inserted topic
   */
  static async add (topic) {
    const sql = `
      INSERT INTO 
        topic(name, \`order\`, universe_idUniverse, article_idArticle) 
        VALUES(?, ?, ?, ?)
      RETURNING *`
    const params = [topic.name, topic.order, topic.idUniverse, topic.idArticle || null]

    return new Topic((await mariadbStore.client.query(sql, params))[0])
  }

  /// PUT

  /**
   * @param { Number } id id of the topic
   * @param { { name: String, order: Number, idArticle: Number? } } topic
   * @returns { Promise<Topic> } if the topic could have been updated
   */
  static async update (id, topic) {
    const sql = `
      INSERT INTO
        topic(idTopic) VALUES(?)
      ON DUPLICATE KEY UPDATE
        name = ?, \`order\` = ?, article_idArticle = ?
      RETURNING *`
    const params = [id, topic.name, topic.order, topic.idArticle]

    return new Topic((await mariadbStore.client.query(sql, params))[0])
  }

  /// DELETE

  /**
   * @param { Number } id id of the topic
   * @returns { Promise<Boolean> } if the topic could have been removed
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
