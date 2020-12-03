import mariadbStore from '../mariadb-store'
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
   * @returns { hal.Resource }
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

  /**
   * @returns { Promise<Template[]> }
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT * FROM template')
  }

  /**
   * @param { Number } id
   * @returns { Promise<Template> }
   */
  static async get (id) {
    const conn = (await mariadbStore.client.query('SELECT * FROM template WHERE idTemplate = ?', id))[0]
    if (!conn) {
      throw new Error(`Template ${id} don't exist !`)
    }

    return new Template(conn)
  }

  /**
   * @param { Template } template
   * @returns { Number } the id of the new inserted template
   */
  static async add (template) {
    const sql = `
      INSERT INTO 
        template(string, bBoolean, idOther) 
        VALUES(?, ?, ?)`
    // All the params we have to put to insert a new row in the table
    const params = [template.string, template.bBoolean, template.idOther]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.insertId || -1
  }

  /**
   * @param { Number } id
   * @param { Template } template
   * @returns { Boolean } if the template could have been updated
   */
  static async update (id, template) {
    const sql = `
      UPDATE template
        SET string = ?, bBoolean = ?
        WHERE idTemplate = ?`
    // All the cols you want to update for a template + the id of the template you want to update
    // /!\ You may never want to change the links
    const params = [template.string, template.bBoolean, id]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.affectedRows === 1
  }

  /**
   * @param { Number } id
   * @returns { Boolean } if the template could have been removed
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
