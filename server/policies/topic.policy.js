import mariadbStore from '../mariadb-store'

class TopicPolicy {
  /**
   * @param { Number } idTopic
   * @returns { Promise<Boolean> }
   */
  static async getUniverseId (idTopic) {
    return (await mariadbStore.client.query('SELECT universe_idUniverse FROM topic WHERE idTopic = ?', idTopic))[0].universe_idUniverse
  }
}

export default TopicPolicy
