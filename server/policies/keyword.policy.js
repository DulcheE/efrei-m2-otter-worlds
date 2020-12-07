import { mariadbStore } from '../mariadb-store.js'

class KeywordPolicy {
  /**
   * @param { Number } idKeyword
   * @returns { Promise<Boolean> }
   */
  static async getUniverseId (idKeyword) {
    if (isNaN(idKeyword)) { throw new TypeError('No keyword specified !') }

    const result = await mariadbStore.client.query(`
      SELECT t.universe_idUniverse FROM keyword k
      INNER JOIN article a
        ON a.idArticle = k.article_idArticle
      INNER JOIN subTopic st
        ON st.idSubTopic = a.subTopic_idSubTopic
      INNER JOIN topic t
        ON t.idTopic = st.topic_idTopic
      WHERE idKeyword = ?
      `, idKeyword)

    if (result.length === 0) { throw new Error('Keyword undefined !') }
    return result[0].universe_idUniverse
  }
}

export default KeywordPolicy
