import { mariadbStore } from '../mariadb-store.js'

class TimelinePolicy {
  /**
   * @param { Number } idTimeline
   * @returns { Promise<Boolean> }
   */
  static async getUniverseId (idTimeline) {
    return (await mariadbStore.client.query('SELECT universe_idUniverse FROM timeline WHERE idTimeline = ?', idTimeline))[0].universe_idUniverse
  }
}

export default TimelinePolicy
