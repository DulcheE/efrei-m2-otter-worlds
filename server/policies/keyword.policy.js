import mariadbStore from '../mariadb-store'

class KeywordPolicy {
  /**
   * @param { Number } idKeyword
   * @returns { Promise<Boolean> }
   */
  static async getUniverseId (idKeyword) {
    return (await mariadbStore.client.query('SELECT universe_idUniverse FROM keyword WHERE idKeyword = ?', idKeyword))[0].universe_idUniverse
  }
}

export default KeywordPolicy
