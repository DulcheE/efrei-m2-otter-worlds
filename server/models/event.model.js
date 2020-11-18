import { baseAPI } from '../routes/routes'
import mariadbStore from '../mariadb-store'
const hal = require('hal')

export default class Template {
  /** @type {Number} */
  idTemplate
  /** @type {String} */
  string
  /** @type {Boolean} */
  bBoolean
  /** @type {Number} */
  idOther

  /**
   * @param {Template} template
   */
  constructor (template) {
    this.idTemplate = template.idTemplate
    this.string = template.string
    this.bBoolean = template.bBoolean
    this.idOther = template.idOther
  }

  asResource (req) {
    // The data from the object
    const resource = hal.Resource(
      {
        id: this.idTemplate,
        string: this.string,
        bBoolean: !!this.bBoolean
      },
      `${baseAPI(req)}templates/${this.idTemplate}`)

    // the links one to one and many to one
    resource.link('other',
      `${baseAPI(req)}others/${this.idOther}`)

    // the links one to many
    resource.link('otherOthers',
      `${baseAPI(req)}templates/${this.idTemplate}/otherOthers`)

    return resource
  }

  /**
   * @param req
   * @param templates {Template[]}
   * @param selfLink {string}
   */
  static asResourceList (req, templates, selfLink = 'templates') {
    const resourceTemplates = []
    for (const template of templates) {
      const _template = new Template(template)
      resourceTemplates.push(_template.asResource(req).toJSON())
    }

    const resource = hal.Resource({ templates: resourceTemplates }, baseAPI(req) + selfLink)

    return resource
  }

  /**
   * @returns {Promise<Template[]>}
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT * FROM template')
  }

  /**
   * @param {Number} id
   * @returns {Promise<Template>}
   */
  static async get (id) {
    const conn = (await mariadbStore.client.query('SELECT * FROM template WHERE idTemplate = ?', id))[0]
    if (!conn) {
      throw new Error(`Template ${id} don't exist !`)
    }

    return new Template(conn)
  }

  /**
   * @param {Template} template
   * @returns {Number} the id of the new inserted template
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
   * @param {Number} id
   * @param {Template} template
   * @returns {Boolean} if the template could have been updated
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
   * @param {Number} id
   * @returns {Boolean} if the template could have been removed
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
