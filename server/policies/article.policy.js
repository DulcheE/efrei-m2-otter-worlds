import { mariadbStore } from '../mariadb-store.js'

class ArticlePolicy {
  /**
   * @param { Number } idArticle
   * @returns { Promise<Boolean> }
   */
  static async getUniverseId (idArticle) {
    if (isNaN(idArticle)) { throw new TypeError('No Article specified !') }

    const result = await mariadbStore.client.query(`
      SELECT t.universe_idUniverse FROM article a
      INNER JOIN subTopic st
        ON st.idSubTopic = a.subTopic_idSubTopic
      INNER JOIN topic t
        ON t.idTopic = st.topic_idTopic
      WHERE idArticle = ?
      `, idArticle)

    if (result.length === 0) { throw new Error('Article undefined !') }
    return result[0].universe_idUniverse
  }
}

export default ArticlePolicy
