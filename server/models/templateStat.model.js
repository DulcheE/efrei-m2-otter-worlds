import { baseAPI } from '../api/routes'
import mariadbStore from '../mariadb-store'
const hal = require('hal')

export default class TemplateStat {
  /** @type {Number} */
  idTemplateStat
  /** @type {String} */
  name
  /** @type {Boolean} */
  bIsNumber
  /** @type {Boolean} */
  bIsRequired
  /** @type {Number} */
  idTemplateCategory

  /**
   * @param {TemplateStat} templateStat
   */
  constructor (templateStat) {
    this.idTemplateStat = templateStat.idTemplateStat
    this.name = templateStat.name
    this.bIsNumber = templateStat.bIsNumber
    this.bIsRequired = templateStat.bIsRequired
    this.idTemplateCategory = templateStat.templateCategory_idTemplateCategory || templateStat.idTemplateCategory
  }

  asResource (req) {
    // The data from the object
    const resource = hal.Resource(
      {
        id: this.idTemplateStat,
        name: this.name,
        bIsNumber: !!this.bIsNumber,
        bIsRequired: !!this.bIsRequired
      },
      `${baseAPI(req)}template-stats/${this.idTemplateStat}`)

    // the links one to one and many to one
    resource.link('template-categorie',
      `${baseAPI(req)}template-categories/${this.idTemplateCategory}`)

    // the links one to many
    resource.link('stats',
      `${baseAPI(req)}template-stats/${this.idTemplateStat}/stats`)

    return resource
  }

  /**
   * @param req
   * @param templateStats {TemplateStat[]}
   * @param selfLink {string}
   */
  static asResourceList (req, templateStats, selfLink = 'templateStats') {
    const resourceTemplateStats = []
    for (const templateStat of templateStats) {
      const _templateStat = new TemplateStat(templateStat)
      resourceTemplateStats.push(_templateStat.asResource(req).toJSON())
    }

    const resource = hal.Resource({ templateStats: resourceTemplateStats }, baseAPI(req) + selfLink)

    return resource
  }

  /**
   * @returns {Promise<TemplateStat[]>}
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT * FROM templateStat')
  }

  /**
   * @param {Number} id
   * @returns {Promise<TemplateStat>}
   */
  static async get (id) {
    const conn = (await mariadbStore.client.query('SELECT * FROM templateStat WHERE idTemplateStat = ?', id))[0]
    if (!conn) {
      throw new Error(`TemplateStat ${id} don't exist !`)
    }

    return new TemplateStat(conn)
  }

  /**
   * @param {TemplateStat} templateStat
   * @returns {Number} the id of the new inserted templateStat
   */
  static async add (templateStat) {
    const sql = `
      INSERT INTO 
        templateStat(name, bIsNumber, bIsRequired, templateCategory_idTemplateCategory) 
        VALUES(?, ?, ?, ?)`
    // All the params we have to put to insert a new row in the table
    const params = [templateStat.name, templateStat.bIsNumber, templateStat.bIsRequired, templateStat.idTemplateCategory]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.insertId || -1
  }

  /**
   * @param {Number} id
   * @param {TemplateStat} templateStat
   * @returns {Boolean} if the templateStat could have been updated
   */
  static async update (id, templateStat) {
    const sql = `
      UPDATE templateStat
        SET name = ?, bIsNumber = ?, bIsRequired = ?
        WHERE idTemplateStat = ?`
    // All the cols you want to update for a templateStat + the id of the templateStat you want to update
    // /!\ You may never want to change the links
    const params = [templateStat.name, templateStat.bIsNumber, templateStat.bIsRequired, id]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.affectedRows === 1
  }

  /**
   * @param {Number} id
   * @returns {Boolean} if the templateStat could have been removed
   */
  static async remove (id) {
    const sql = `
      DELETE FROM templateStat
        WHERE idTemplateStat = ?`
    const params = [id]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.affectedRows === 1
  }
}
