import { mariadbStore } from '../mariadb-store.js'
import { HalResource, HalResourceData, HalToOneLinks } from '../middlewares/hal-parser.js'

class HalResourceDataTemplate extends HalResourceData {
  /** @type { String } */
  string
  /** @type { Boolean } */
  bBoolean
}

class HalToOneLinksTemplate extends HalToOneLinks {
  /** @type { Number } */
  other
}

export default class Template extends HalResource {
  /** @type { HalResourceDataTemplate } */
  data
  /** @type { HalToOneLinksTemplate } */
  toOneLinks
  /** @type { String[] } */
  static toManyLinks = ['otherOther']

  /**
   * @param { Template } template
   */
  constructor (template) {
    super()

    this.id = template.idTemplate || template.id

    this.data = new HalResourceDataTemplate()
    this.data.string = template.string || template.data.string
    this.data.bBoolean = template.bBoolean || template.data.bBoolean

    this.toOneLinks = new HalToOneLinksTemplate()
    this.toOneLinks.other = template.idOther || template.toOneLinks.other
  }

  /**
   * @param { String } baseAPI
   * @param { String } resourcePath
   */
  asResource (baseAPI, resourcePath = 'templates') {
    return super.asResource(baseAPI, resourcePath)
  }

  /**
   * @param { String } baseAPI
   * @param { HalResource[] } list
   * @param { String } selfLink
   * @param { String } resourcePath
   */
  static asResourceList (baseAPI, list, selfLink = 'templates', resourcePath = 'templates') {
    return super.asResourceList(baseAPI, list, selfLink, resourcePath, Template)
  }

  /// GET

  /**
   * @returns { Promise<Template[]> }
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT * FROM template')
  }

  /**
   * @param { Number } id id of the template
   * @returns { Promise<Template> }
   */
  static async get (id) {
    return new Template((await mariadbStore.client.query('SELECT * FROM template WHERE idTemplate = ?', id))[0])
  }

  /// POST

  /**
   * @param { { string: String, bBoolean: Boolean, idOther: Number } } template
   * @returns { Promise<Template> } the id of the new inserted template
   */
  static async add (template) {
    const sql = `
      INSERT INTO 
        template(string, bBoolean, idOther) 
        VALUES(?, ?, ?)
      RETURNING *`
    // All the params we have to put to insert a new row in the table
    const params = [template.string, template.bBoolean, template.idOther]

    return new Template((await mariadbStore.client.query(sql, params))[0])
  }

  /// PUT

  /**
   * @param { Number } id id of the template
   * @param { { string: String, bBoolean: Boolean } } template
   * @returns { Promise<Template> } if the template could have been updated
   */
  static async update (id, template) {
    const sql = `
      INSERT INTO
        template(idTemplate) VALUES(?)
      ON DUPLICATE KEY UPDATE
        string = ?, bBoolean = ?
      RETURNING *`
    // All the cols you want to update for a template + the id of the template you want to update
    // /!\ You may never want to change the links
    const params = [id, template.string, template.bBoolean]

    return new Template((await mariadbStore.client.query(sql, params))[0])
  }

  /// DELETE

  /**
   * @param { Number } id id of the template
   * @returns { Promise<Boolean> } if the template could have been removed
   */
  static async remove (id) {
    const sql = `
      DELETE FROM template
        WHERE idTemplate = ?`
    const params = [id]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.affectedRows === 1
  }
}
