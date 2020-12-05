import mariadbStore from '../mariadb-store'

class EventPolicy {
  /**
   * @param { Number } idEvent
   * @returns { Promise<Boolean> }
   */
  static async getUniverseId (idEvent) {
    return (await mariadbStore.client.query(`
      SELECT t.universe_idUniverse FROM event e
      INNER JOIN timeline t
        ON t.idTimeline = e.timeline_idTimeline
      WHERE idEvent = ?
      `, idEvent))[0].universe_idUniverse
  }
}

export default EventPolicy
