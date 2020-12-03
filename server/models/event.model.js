import mariadbStore from '../mariadb-store'
import { HalResource, HalResourceData, HalToOneLinks } from '../middlewares/hal-parser.js'

class HalResourceDataEvent extends HalResourceData {
  /** @type { String } */
  name
  /** @type { Number } */
  year
  /** @type { Number } */
  month
  /** @type { Number } */
  day
  /** @type { String } */
  description
}

class HalToOneLinksEvent extends HalToOneLinks {
  /** @type { Number } */
  timeline
  /** @type { Number } */
  article
}

export default class Event extends HalResource {
  /** @type { HalResourceDataEvent } */
  data
  /** @type { HalToOneLinksEvent } */
  toOneLinks
  /** @type { String[] } */
  static toManyLinks = []

  /**
   * @param { Event } event
   */
  constructor (event) {
    super()
    this.id = event.idEvent || event.id

    this.data = new HalResourceDataEvent()
    this.data.name = event.name || event.data.name
    this.data.year = event.year || event.data.year
    this.data.month = event.month || event.data.month
    this.data.day = event.day || event.data.day
    this.data.description = event.description || event.data.description

    this.toOneLinks = new HalToOneLinksEvent()
    this.toOneLinks.timeline = event.timeline_idTimeline || event.toOneLinks.timeline
    this.toOneLinks.article = event.article_idArticle || event.toOneLinks.article
  }

  /**
   * @param { String } baseAPI
   * @param { String } resourcePath
   * @returns { hal.Resource }
   */
  asResource (baseAPI, resourcePath = 'events') {
    return super.asResource(baseAPI, resourcePath)
  }

  /**
   * @param { String } baseAPI
   * @param { HalResource[] } list
   * @param { String } selfLink
   * @param { String } resourcePath
   */
  static asResourceList (baseAPI, list, selfLink = 'events', resourcePath = 'events') {
    return super.asResourceList(baseAPI, list, selfLink, resourcePath, Event)
  }

  /**
   * @returns { Promise<Event[]> }
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT * FROM Event  ORDER BY year, month, day')
  }

  /**
   * @param { Number } id
   * @returns { Promise<Event[]> }
   */
  static async getForTimeline (id) {
    return await mariadbStore.client.query('SELECT * FROM Event WHERE timeline_idTimeline = ? ORDER BY year, month, day', id)
  }

  /**
   * @param { Number } id
   * @returns { Promise<Event[]> }
   */
  static async getForArticle (id) {
    return await mariadbStore.client.query('SELECT * FROM Event WHERE article_idArticle = ? ORDER BY year, month, day', id)
  }

  /**
   * @param { Number } id
   * @returns { Promise<Event> }
   */
  static async get (id) {
    const conn = (await mariadbStore.client.query('SELECT * FROM event WHERE idEvent = ?', id))[0]
    if (!conn) {
      throw new Error(`Event ${id} don't exist !`)
    }

    return new Event(conn)
  }

  /**
   * @param { Event } event
   * @returns { Number } the id of the new inserted Event
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
   * @param { Number } id
   * @param { Event } event
   * @returns { Boolean } if the event could have been updated
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
   * @param { Number } id
   * @returns { Boolean } if the event could have been removed
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
