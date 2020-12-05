import mariadbStore from '../mariadb-store'

class TemplateStatPolicy {
  /**
   * @param { Number } idTemplateStat
   * @returns { Promise<Boolean> }
   */
  static async getUniverseId (idTemplateStat) {
    return (await mariadbStore.client.query(`
      SELECT tc.universe_idUniverse FROM templateStat ts
      INNER JOIN templateCategory tc
        ON tc.idTemplateCategory = ts.templateCategory_idTemplateCategory
      WHERE idTemplateStat = ?
      `, idTemplateStat))[0].universe_idUniverse
  }
}

export default TemplateStatPolicy
