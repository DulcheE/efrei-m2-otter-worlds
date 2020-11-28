import { baseAPI } from '../api/routes'
import mariadbStore from '../mariadb-store'
const hal = require('hal')

export default class Timeline {
  /** @type {Number} */
  idTimeline
  /** @type {String} */
  name
  /** @type {String} */
  description
  /** @type {Boolean} */
  bIsPublic
  /** @type  {Event[]} */
  events
  /** @type {Number} */
  idUniverse

  /**
   * @param {Timeline} timeline
   */
  constructor (timeline) {
    this.idTimeline = timeline.idTimeline
    this.name = timeline.name
    this.description = timeline.description
    this.bIsPublic = timeline.bIsPublic
    this.events = []
    this.idUniverse = timeline.universe_idUniverse || timeline.idUniverse
  }

  asResource (req) {
    // The data from the object
    const resource = hal.Resource(
      {
        id: this.idTimeline,
        name: this.name,
        description: this.description,
        bIsPublic: this.bIsPublic,
        events: this.events
      },
      `${baseAPI(req)}timelines/${this.idTimeline}`)

    // the links one to one and many to one
    resource.link('universe',
      `${baseAPI(req)}universes/${this.idUniverse}`)

    // the links one to many
    resource.link('events',
      `${baseAPI(req)}timelines/${this.idTimeline}/events`)

    return resource
  }

  /**
   * @param req
   * @param timeline {Timeline[]}
   * @param selfLink {string}
   */
  static asResourceList (req, timelines, selfLink = 'timelines') {
    const resourceTimeline = []
    for (const timeline of timelines) {
      const _timeline = new Timeline(timeline)
      resourceTimeline.push(_timeline.asResource(req).toJSON())
    }

    const resource = hal.Resource({ timelines: resourceTimeline }, baseAPI(req) + selfLink)

    return resource
  }

  /**
   * @returns {Promise<Timeline[]>}
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT * FROM timeline')
  }

  /**
   * @param {Number} id
   * @returns {Promise<Timeline>}
   */
  static async get (id) {
    const conn = (await mariadbStore.client.query('SELECT * FROM timeline WHERE idTimeline = ?', id))[0]
    if (!conn) {
      throw new Error(`Timeline ${id} don't exist !`)
    }

    return new Timeline(conn)
  }

  /**
   * @param {Timeline} timeline
   * @returns {Number} the id of the new inserted timeline
   */
  static async add (timeline) {
    const sql = `
      INSERT INTO
        timeline(name, description, bIsPublic, universe_idUniverse)
        VALUES(?, ?, ?, ?)`
    // All the params we have to put to insert a new row in the table
    const params = [timeline.name, timeline.description, timeline.bIsPublic, timeline.idUniverse]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.insertId || -1
  }

  /**
   * @param {Number} id
   * @param {Timeline} timeline
   * @returns {Boolean} if the timeline could have been updated
   */
  static async update (id, timeline) {
    const sql = `
      UPDATE timeline
        SET name = ?, description = ?, bIsPublic =?
        WHERE idTimeline = ?`
    // All the cols you want to update for a timeline + the id of the timeline you want to update
    // /!\ You may never want to change the links
    const params = [timeline.name, timeline.description, timeline.bIsPublic, id]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.affectedRows === 1
  }

  /**
   * @param {Number} id
   * @returns {Boolean} if the timeline could have been removed
   */
  static async remove (id) {
    const sql = `
      DELETE FROM timeline
        WHERE idTimeline = ?`
    const params = [id]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.affectedRows === 1
  }
}
