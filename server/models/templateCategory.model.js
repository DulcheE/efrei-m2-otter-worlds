import { baseAPI } from '../routes/routes'
import mariadbStore from '../mariadb-store'
const hal = require('hal')

export default class TemplateCategory {
  /** @type {Number} */
  idTemplateCategory
  /** @type {String} */
  name
  /** @type {Number} */
  order
  /** @type {Number} */
  idUniverse

  /**
   * @param {TemplateCategory} templateCategory
   */
  constructor (templateCategory) {
    this.idTemplateCategory = templateCategory.idTemplateCategory
    this.name = templateCategory.name
    this.order = templateCategory.order
    this.idUniverse = templateCategory.universe_idUniverse || templateCategory.idUniverse
  }

  asResource (req) {
    // The data from the object
    const resource = hal.Resource(
      {
        id: this.idTemplateCategory,
        name: this.name,
        order: this.order
      },
      `${baseAPI(req)}template-categories/${this.idTemplateCategory}`)

    // the links one to one and many to one
    resource.link('universe',
      `${baseAPI(req)}universes/${this.idUniverse}`)

    // the links one to many
    resource.link('template-stats',
      `${baseAPI(req)}template-categories/${this.idTemplateCategory}/template-stats`)

    return resource
  }

  /**
   * @param req
   * @param templateCategories {TemplateCategory[]}
   * @param selfLink {string}
   */
  static asResourceList (req, templateCategories, selfLink = 'template-categories') {
    const resourceTemplateCategories = []
    for (const templateCategory of templateCategories) {
      const _templateCategory = new TemplateCategory(templateCategory)
      resourceTemplateCategories.push(_templateCategory.asResource(req).toJSON())
    }

    const resource = hal.Resource({ templateCategories: resourceTemplateCategories }, baseAPI(req) + selfLink)

    return resource
  }

  /**
   * @returns {Promise<TemplateCategory[]>}
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT * FROM templateCategory')
  }

  /**
   * @param {Number} id
   * @returns {Promise<TemplateCategory>}
   */
  static async get (id) {
    const conn = (await mariadbStore.client.query('SELECT * FROM templateCategory WHERE idTemplateCategory = ?', id))[0]
    if (!conn) {
      throw new Error(`TemplateCategory ${id} don't exist !`)
    }

    return new TemplateCategory(conn)
  }

  /**
   * @param {TemplateCategory} templateCategory
   * @returns {Number} the id of the new inserted templateCategory
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
   * @param {Number} id
   * @param {TemplateCategory} templateCategory
   * @returns {Boolean} if the templateCategory could have been updated
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
   * @param {Number} id
   * @returns {Boolean} if the templateCategory could have been removed
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
