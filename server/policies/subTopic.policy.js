import { mariadbStore } from '../mariadb-store.js'

class SubTopicPolicy {
  /**
   * @param { Number } idUser
   * @param { Number } idSubTopic
   * @returns { Promise<Boolean> }
   */
  static async canGet (idUser, idSubTopic) {
    if (isNaN(idSubTopic)) { return false }

    const result = await mariadbStore.client.query('SELECT 1 FROM subTopic WHERE idSubTopic = ? AND name != "[OTTERWORLDS-SUBTOPIC-SYSTEM]"', idSubTopic)

    return result.length !== 0
  }

  /**
   * @param { Number } idUser
   * @param { { name: String, order: Number } } subTopic
   * @returns { Promise<Boolean> }
   */
  static verify (idUser, subTopic) {
    if (subTopic.name === '[OTTERWORLDS-SUBTOPIC-SYSTEM]') { return false }
    if (subTopic.order <= 0) { return false }
    return true
  }

  /**
   * @param { Number } idSubTopic
   * @returns { Promise<Boolean> }
   */
  static async getUniverseId (idSubTopic) {
    const result = await mariadbStore.client.query(`
    SELECT t.universe_idUniverse FROM subTopic st
    INNER JOIN topic t
      ON t.idTopic = st.topic_idTopic
    WHERE st.idSubTopic = ?
    `, idSubTopic)
    if (result.length === 0) { throw new Error('No universe found for given SubTopic') }

    return result[0].universe_idUniverse
  }
}

export default SubTopicPolicy
