import { mariadbStore } from '../mariadb-store.js'

class GroupPolicy {
  /**
   * @param { Number } idGroup
   * @returns { Promise<Boolean> }
   */
  static async getUniverseId (idGroup) {
    return (await mariadbStore.client.query('SELECT universe_idUniverse FROM `group` WHERE idGroup = ?', idGroup))[0].universe_idUniverse
  }
}

export default GroupPolicy
