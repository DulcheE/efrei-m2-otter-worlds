import mariadbStore from '../mariadb-store'

class ArticlePolicy {
  /**
   * @param { Number } idArticle
   * @returns { Promise<Boolean> }
   */
  static async getUniverseId (idArticle) {
    return (await mariadbStore.client.query(`
      SELECT t.universe_idUniverse FROM article a
      INNER JOIN subTopic st
        ON st.idSubTopic = a.subTopic_idSubTopic
      INNER JOIN topic t
        ON t.idTopic = st.topic_idTopic
      WHERE idArticle = ?
      `, idArticle))[0].universe_idUniverse
  }
}

export default ArticlePolicy
