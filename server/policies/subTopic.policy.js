import mariadbStore from '../mariadb-store'

class SubTopicPolicy {
  /**
   * @param { Number } idSubTopic
   * @returns { Promise<Boolean> }
   */
  static async getUniverseId (idSubTopic) {
    return (await mariadbStore.client.query(`
      SELECT t.universe_idUniverse FROM subTopic st
      INNER JOIN topic t
        ON t.idTopic = st.topic_idTopic
      WHERE idSubTopic = ?
      `, idSubTopic))[0].universe_idUniverse
  }
}

export default SubTopicPolicy
