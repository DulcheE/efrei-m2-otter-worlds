import mariadbStore from '../mariadb-store'

class TemplateCategoryPolicy {
  /**
   * @param { Number } idTemplateCategory
   * @returns { Promise<Boolean> }
   */
  static async getUniverseId (idTemplateCategory) {
    return (await mariadbStore.client.query('SELECT universe_idUniverse FROM templateCategory WHERE idTemplateCategory = ?', idTemplateCategory))[0].universe_idUniverse
  }
}

export default TemplateCategoryPolicy
