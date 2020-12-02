import mariadbStore from '../mariadb-store'
import { HalResource, HalResourceData, HalToOneLinks } from '../middlewares/hal-parser.js'

class HalResourceDataTemplateCategory extends HalResourceData {
  /** @type { String } */
  name
  /** @type { Number } */
  order
}

class HalToOneLinksTemplateCategory extends HalToOneLinks {
  /** @type { Number } */
  universe
}

export default class TemplateCategory extends HalResource {
  /** @type { HalResourceDataTemplateCategory } */
  data
  /** @type { HalToOneLinksTemplateCategory } */
  toOneLinks
  /** @type { String[] } */
  static toManyLinks = ['template-stats']

  /**
   * @param { TemplateCategory } templateCategory
   */
  constructor (templateCategory) {
    super()

    this.id = templateCategory.idTemplateCategory || templateCategory.id

    this.data = new HalResourceDataTemplateCategory()
    this.data.name = templateCategory.name || templateCategory.data.name
    this.data.order = templateCategory.order || templateCategory.data.order

    this.toOneLinks = new HalToOneLinksTemplateCategory()
    this.toOneLinks.universe = templateCategory.universe_idUniverse || templateCategory.toOneLinks.universe
  }

  /**
   * @param { String } baseAPI
   * @param { String } resourcePath
   * @returns { hal.Resource }
   */
  asResource (baseAPI, resourcePath = 'template-categories') {
    return super.asResource(baseAPI, resourcePath)
  }

  /**
   * @param { String } baseAPI
   * @param { HalResource[] } list
   * @param { String } selfLink
   * @param { String } resourcePath
   */
  static asResourceList (baseAPI, list, selfLink = 'template-categories', resourcePath = 'template-categories') {
    return super.asResourceList(baseAPI, list, selfLink, resourcePath, TemplateCategory)
  }

  /**
   * @returns { Promise<TemplateCategory[]> }
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT * FROM templateCategory')
  }

  /**
   * @param { Number } id
   * @returns { Promise<TemplateCategory> }
   */
  static async get (id) {
    const conn = (await mariadbStore.client.query('SELECT * FROM templateCategory WHERE idTemplateCategory = ?', id))[0]
    if (!conn) {
      throw new Error(`TemplateCategory ${id} don't exist !`)
    }

    return new TemplateCategory(conn)
  }

  /**
   * @param { TemplateCategory } templateCategory
   * @returns { Number } the id of the new inserted templateCategory
   */
  static async add (templateCategory) {
    const sql = `
      INSERT INTO 
        templateCategory(name, \`order\`, universe_idUniverse) 
        VALUES(?, ?, ?)`
    // All the params we have to put to insert a new row in the table
    const params = [templateCategory.name, templateCategory.order, templateCategory.idUniverse]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.insertId || -1
  }

  /**
   * @param { Number } id
   * @param { TemplateCategory } templateCategory
   * @returns { Boolean } if the templateCategory could have been updated
   */
  static async update (id, templateCategory) {
    const sql = `
      UPDATE templateCategory
        SET name = ?, \`order\` = ?
        WHERE idTemplateCategory = ?`
    // All the cols you want to update for a templateCategory + the id of the templateCategory you want to update
    // /!\ You may never want to change the links
    const params = [templateCategory.name, templateCategory.order, id]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.affectedRows === 1
  }

  /**
   * @param { Number } id
   * @returns { Boolean } if the templateCategory could have been removed
   */
  static async remove (id) {
    const sql = `
      DELETE FROM templateCategory
        WHERE idTemplateCategory = ?`
    const params = [id]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.affectedRows === 1
  }
}
