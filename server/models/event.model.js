import { baseAPI } from '../routes/routes'
import mariadbStore from '../mariadb-store'
const hal = require('hal')

export default class Event {
  /** @type {Number} */
  idEvent
  /** @type {String} */
  name
  /** @type {Number} */
  year
  /** @type {Number} */
  month
  /** @type {Number} */
  day
  /** @type {String} */
  description
  /** @type {Number} */
  idTimeline
  /** @type {Number} */
  idArticle

  /**
   * @param {Event} event
   */
  constructor (event) {
    this.idEvent = event.idEvent
    this.name = event.name
    this.year = event.year
    this.month = event.month || null
    this.day = event.day || null
    this.description = event.description
    this.idTimeline = event.idTimeline || event.timeline_idTimeline
    this.idArticle = event.idArticle || event.article_idArticle || null
  }

  asResource (req) {
    // The data from the object
    const resource = hal.Resource(
      {
        id: this.idEvent,
        name: this.name,
        year: this.year,
        month: this.month,
        day: this.day,
        description: this.description
      },
      `${baseAPI(req)}events/${this.idEvent}`)

    // the links one to one and many to one
    resource.link('timeline',
      `${baseAPI(req)}timelines/${this.idTimeline}`)
    resource.link('article',
      `${baseAPI(req)}articles/${this.idArticle}`)

    return resource
  }

  /**
   * @param req
   * @param events {Event[]}
   * @param selfLink {string}
   */
  static asResourceList (req, events, selfLink = 'events') {
    const resourceEvents = []
    for (const event of events) {
      const _Event = new Event(event)
      resourceEvents.push(_Event.asResource(req).toJSON())
    }

    const resource = hal.Resource({ events: resourceEvents }, baseAPI(req) + selfLink)

    return resource
  }

  /**
   * @returns {Promise<Event[]>}
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT * FROM Event  ORDER BY year, month, day')
  }

  /**
   * @param {Number} id
   * @returns {Promise<Event[]>}
   */
  static async getForTimeline (id) {
    return await mariadbStore.client.query('SELECT * FROM Event WHERE timeline_idTimeline = ? ORDER BY year, month, day', id)
  }

  /**
   * @param {Number} id
   * @returns {Promise<Event[]>}
   */
  static async getForArticle (id) {
    return await mariadbStore.client.query('SELECT * FROM Event WHERE article_idArticle = ? ORDER BY year, month, day', id)
  }

  /**
   * @param {Number} id
   * @returns {Promise<Event>}
   */
  static async get (id) {
    const conn = (await mariadbStore.client.query('SELECT * FROM event WHERE idEvent = ?', id))[0]
    if (!conn) {
      throw new Error(`Event ${id} don't exist !`)
    }

    return new Event(conn)
  }

  /**
   * @param {Event} event
   * @returns {Number} the id of the new inserted Event
   */
  static async add (event) {
    const sql = `
      INSERT INTO
        Event(name, year, month, day, description, timeline_idTimeline, article_idArticle)
        VALUES(?, ?, ?, ?, ?, ?, ?)`
    // All the params we have to put to insert a new row in the table
    const params = [event.name, event.year, event.month, event.day, event.description, event.idTimeline, event.idArticle]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.insertId || -1
  }

  /**
   * @param {Number} id
   * @param {Event} event
   * @returns {Boolean} if the event could have been updated
   */
  static async update (id, event) {
    const sql = `
      UPDATE Event
        SET name = ?, year = ?, month = ?, day = ?, description=?, article_idArticle = ?
        WHERE idEvent = ?`
    // All the cols you want to update for a event + the id of the event you want to update
    // /!\ You may never want to change the links
    const params = [event.name, event.year, event.month, event.day, event.description, event.idArticle, id]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.affectedRows === 1
  }

  /**
   * @param {Number} id
   * @returns {Boolean} if the event could have been removed
   */
  static async remove (id) {
    const sql = `
      DELETE FROM event
        WHERE idEvent = ?`
    const params = [id]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.affectedRows === 1
  }
}
