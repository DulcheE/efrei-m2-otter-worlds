import { mariadbStore } from '../mariadb-store.js'
import { HalResource, HalResourceData, HalToOneLinks } from '../middlewares/hal-parser.js'

class HalResourceDataSubTopic extends HalResourceData {
  /** @type { String } */
  name
  /** @type { Number } */
  order
}

class HalToOneLinksSubTopic extends HalToOneLinks {
  /** @type { Number } */
  topic
  /** @type { Number } */
  article
}

export default class SubTopic extends HalResource {
  /** @type { HalResourceDataSubTopic } */
  data
  /** @type { HalToOneLinksSubTopic } */
  toOneLinks
  /** @type { String[] } */
  static toManyLinks = ['articles']

  /**
   * @param { SubTopic } subTopic
   */
  constructor (subTopic) {
    super()

    this.id = subTopic.idSubTopic || subTopic.id

    this.data = new HalResourceDataSubTopic()
    this.data.name = subTopic.name || subTopic.data.name
    this.data.order = (subTopic.order !== undefined) ? subTopic.order : subTopic.data.ordre

    this.toOneLinks = new HalToOneLinksSubTopic()
    this.toOneLinks.topic = subTopic.topic_idTopic || subTopic.toOneLinks.topic
    this.toOneLinks.article = subTopic.article_idArticle || (subTopic.toOneLinks !== undefined) ? subTopic.toOneLinks.article : undefined
  }

  /**
   * @param { String } baseAPI
   * @param { String } resourcePath
   */
  asResource (baseAPI, resourcePath = 'sub-topics') {
    return super.asResource(baseAPI, resourcePath)
  }

  /**
   * @param { String } baseAPI
   * @param { HalResource[] } list
   * @param { String } selfLink
   * @param { String } resourcePath
   */
  static asResourceList (baseAPI, list, selfLink = 'sub-topics', resourcePath = 'sub-topics') {
    return super.asResourceList(baseAPI, list, selfLink, resourcePath, SubTopic)
  }

  /// GET

  /**
   * @returns { Promise<SubTopic[]> }
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT * FROM subTopic')
  }

  /**
   * @param { Number } id id of the subTopic
   * @returns { Promise<SubTopic> }
   */
  static async get (id) {
    return new SubTopic((await mariadbStore.client.query('SELECT * FROM subTopic WHERE idSubTopic = ?', id))[0])
  }

  /**
   * @param { Number } id id of the topic
   * @returns { Promise<SubTopic[]> }
   */
  static async getByTopic (id) {
    return await mariadbStore.client.query('SELECT * FROM subTopic WHERE topic_idTopic = ?', id)
  }

  /// POST

  /**
   * @param { { name: String, order: Number, idTopic: Number, idArticle: Number? } } subTopic
   * @returns { Promise<SubTopic> } the id of the new inserted subTopic
   */
  static async add (subTopic) {
    const sql = `
    INSERT INTO 
      subTopic(name, \`order\`, topic_idTopic, article_idArticle) 
      VALUES(?, ?, ?, ?)
    RETURNING *`
    const params = [subTopic.name, subTopic.order, subTopic.idTopic, subTopic.idArticle || null]

    return new SubTopic((await mariadbStore.client.query(sql, params))[0])
  }

  /// PUT

  /**
   * @param { Number } id id of the subTopic
   * @param { { name: String, order: Number, idArticle: Number? } } subTopic
   * @returns { Promise<SubTopic> } if the subTopic could have been updated
   */
  static async update (id, subTopic) {
    const sql = `
      INSERT INTO
        subTopic(idSubTopic) VALUES(?)
      ON DUPLICATE KEY UPDATE
        name = ?, \`order\` = ?, article_idArticle = ?
      RETURNING *`
    const params = [id, subTopic.name, subTopic.order, subTopic.idArticle || null]

    return new SubTopic((await mariadbStore.client.query(sql, params))[0])
  }

  /// DELETE

  /**
   * @param { Number } id id of the subTopic
   * @returns { Promise<Boolean> } if the subTopic could have been removed
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
