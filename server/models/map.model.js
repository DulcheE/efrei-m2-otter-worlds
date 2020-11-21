import { baseAPI } from '../routes/routes'
import mariadbStore from '../mariadb-store'
// import InterestPoint from './interestPoint.model'
const hal = require('hal')

export default class Map {
  /** @type {Number} */
  idMap
  /** @type {String} */
  name
  /** @type {Number} */
  idUniverse
  /** @type {Number} */
  idArticle
  /** @type{ InterestPoint[] } */
  interestPoints

  /**
   * @param {Map} map
   */
  constructor (map) {
    this.idMap = map.idMap
    this.name = map.name
    this.interestPoints = []
    this.idUniverse = map.idUniverse || map.universe_idUniverse
    this.idArticle = map.idArticle || map.article_idArticle
  }

  asResource (req) {
    // The data from the object
    const resource = hal.Resource(
      {
        id: this.idMap,
        name: this.name,
        interestPoints: this.interestPoints
      },
      `${baseAPI(req)}maps/${this.idMap}`)

    // the links one to one and many to one
    resource.link('Article',
      `${baseAPI(req)}Articles/${this.idArticle}`)
    resource.link('Universe',
      `${baseAPI(req)}Universes/${this.idUniverse}`)

    // the links one to many
    resource.link('InterestPoints',
      `${baseAPI(req)}maps/${this.idMap}/InterestPoints`)

    return resource
  }

  /**
   * @param req
   * @param maps {Map[]}
   * @param selfLink {string}
   */
  static asResourceList (req, maps, selfLink = 'maps') {
    const resourcemaps = []
    for (const map of maps) {
      const _map = new Map(map)
      resourcemaps.push(_map.asResource(req).toJSON())
    }

    const resource = hal.Resource({ maps: resourcemaps }, baseAPI(req) + selfLink)

    return resource
  }

  /**
   * @returns {Promise<Map[]>}
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT * FROM map')
  }

  /**
   * @param {Number} id
   * @returns {Promise<Map>}
   */
  static async get (id) {
    const conn = (await mariadbStore.client.query('SELECT * FROM map WHERE idMap = ?', id))[0]
    if (!conn) {
      throw new Error(`Map ${id} don't exist !`)
    }

    return new Map(conn)
  }

  /**
   * @param {Map} map
   * @returns {Number} the id of the new inserted map
   */
  static async add (map) {
    const sql = `
      INSERT INTO
        map(name, universe_idUniverse, article_idArticle)
        VALUES(?, ?, ?)`
    // All the params we have to put to insert a new row in the table
    const params = [map.name, map.idUniverse, map.idArticle]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.insertId || -1
  }

  /**
   * @param {Number} id
   * @param {Map} map
   * @returns {Number} if the map could have been updated
   */
  static async update (id, map) {
    const sql = `
      UPDATE map
        SET name = ?
        WHERE idMap = ?`
    // All the cols you want to update for a map + the id of the map you want to update
    // /!\ You may never want to change the links
    const params = [map.name, id]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.affectedRows === 1
  }

  /**
   * @param {Number} id
   * @returns {Number} if the map could have been removed
   */
  static async remove (id) {
    const sql = `
      DELETE FROM map
        WHERE idMap = ?`
    const params = [id]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.affectedRows === 1
  }
}
