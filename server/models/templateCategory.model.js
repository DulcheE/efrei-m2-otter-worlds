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

  /// GET

  /**
   * @returns { Promise<TemplateCategory[]> }
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT * FROM templateCategory')
  }

  /**
   * @param { Number } id id of the templateCategory
   * @returns { Promise<TemplateCategory> }
   */
  static async get (id) {
    return new TemplateCategory((await mariadbStore.client.query('SELECT * FROM templateCategory WHERE idTemplateCategory = ?', id))[0])
  }

  /**
   * @param { Number } id id of the universe
   * @returns { Promise<TemplateCategory[]> }
   */
  static async getByUniverse (id) {
    return await mariadbStore.client.query('SELECT * FROM templateCategory WHERE universe_idUniverse = ?', id)
  }

  /// POST

  /**
   * @param { { name: String, order: Number, idUniverse: Number } } templateCategory
   * @returns { Promise<TemplateCategory> } the id of the new inserted templateCategory
   */
  static async add (templateCategory) {
    const sql = `
      INSERT INTO
        templateCategory(name, \`order\`, universe_idUniverse)
        VALUES(?, ?, ?)
      RETURNING *`
    // All the params we have to put to insert a new row in the table
    const params = [templateCategory.name, templateCategory.order, templateCategory.idUniverse]

    return new TemplateCategory((await mariadbStore.client.query(sql, params))[0])
  }

  /// PUT

  /**
   * @param { Number } id id of the templateCategory
   * @param { { name: String, order: Number } } templateCategory
   * @returns { Promise<Boolean> } if the templateCategory could have been updated
   */
  static async update (id, templateCategory) {
    const sql = `
      UPDATE templateCategory
        SET name = ?, \`order\` = ?
        WHERE idTemplateCategory = ?`
    const params = [templateCategory.name, templateCategory.order, id]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.affectedRows === 1
  }

  /// DELETE

  /**
   * @param { Number } id id of the templateCategory
   * @returns { Promise<Boolean> } if the templateCategory could have been removed
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
