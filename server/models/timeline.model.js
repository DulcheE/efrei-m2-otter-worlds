import mariadbStore from '../mariadb-store'
import { HalResource, HalResourceData, HalToOneLinks } from '../middlewares/hal-parser.js'

class HalResourceDataTimeline extends HalResourceData {
  /** @type { String } */
  name
  /** @type { String } */
  description
  /** @type { Boolean } */
  bIsPublic
}

class HalToOneLinksTimeline extends HalToOneLinks {
  /** @type { Number } */
  universe
}

export default class Timeline extends HalResource {
  /** @type { HalResourceDataTimeline } */
  data
  /** @type { HalToOneLinksTimeline } */
  toOneLinks
  /** @type { String[] } */
  static toManyLinks = ['events']

  /**
   * @param { Timeline } timeline
   */
  constructor (timeline) {
    super()

    this.id = timeline.idTimeline || timeline.id

    this.data = new HalResourceDataTimeline()
    this.data.name = timeline.name || timeline.data.name
    this.data.description = timeline.description || timeline.data.description
    this.data.bIsPublic = (timeline.bIsPublic !== undefined) ? !!timeline.bIsPublic : timeline.data.bIsPublic

    this.toOneLinks = new HalToOneLinksTimeline()
    this.toOneLinks.universe = timeline.universe_idUniverse || timeline.toOneLinks.universe
  }

  /**
   * @param { String } baseAPI
   * @param { String } resourcePath
   * @returns { hal.Resource }
   */
  asResource (baseAPI, resourcePath = 'timelines') {
    return super.asResource(baseAPI, resourcePath)
  }

  /**
   * @param { String } baseAPI
   * @param { HalResource[] } list
   * @param { String } selfLink
   * @param { String } resourcePath
   */
  static asResourceList (baseAPI, list, selfLink = 'timelines', resourcePath = 'timelines') {
    return super.asResourceList(baseAPI, list, selfLink, resourcePath, Timeline)
  }

  /**
   * @returns { Promise<Timeline[]> }
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT * FROM timeline')
  }

  /**
   * @param { Number } id
   * @returns { Promise<Timeline> }
   */
  static async get (id) {
    const conn = (await mariadbStore.client.query('SELECT * FROM timeline WHERE idTimeline = ?', id))[0]
    if (!conn) {
      throw new Error(`Timeline ${id} don't exist !`)
    }

    return new Timeline(conn)
  }

  /**
   * @param { Timeline } timeline
   * @returns { Number } the id of the new inserted timeline
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
   * @param { Number } id
   * @param { Timeline } timeline
   * @returns { Boolean } if the timeline could have been updated
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
   * @param { Number } id
   * @returns { Boolean } if the timeline could have been removed
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
