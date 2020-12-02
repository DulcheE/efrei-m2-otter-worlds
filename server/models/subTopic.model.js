import mariadbStore from '../mariadb-store'
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
    this.data.order = subTopic.order || subTopic.data.ordre

    this.toOneLinks = new HalToOneLinksSubTopic()
    this.toOneLinks.topic = subTopic.topic_idTopic || subTopic.toOneLinks.topic
    this.toOneLinks.article = subTopic.article_idArticle || (subTopic.toOneLinks !== undefined) ? subTopic.toOneLinks.article : undefined
  }

  /**
   * @param { String } baseAPI
   * @param { String } resourcePath
   * @returns { hal.Resource }
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

  /**
   * @returns { Promise<SubTopic[]> }
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT * FROM subTopic')
  }

  /**
   * @param { Number } id
   * @returns { Promise<SubTopic> }
   */
  static async get (id) {
    const conn = (await mariadbStore.client.query('SELECT * FROM subTopic WHERE idSubTopic = ?', id))[0]
    if (!conn) {
      throw new Error(`SubTopic ${id} don't exist !`)
    }

    return new SubTopic(conn)
  }

  /**
   * @param { SubTopic } subTopic
   * @returns { Number } the id of the new inserted subTopic
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
   * @param { Number } id
   * @param { SubTopic } subTopic
   * @returns { Boolean } if the subTopic could have been updated
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
   * @param { Number } id
   * @returns { Boolean } if the subTopic could have been removed
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
