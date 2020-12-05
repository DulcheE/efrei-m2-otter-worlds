import mariadbStore from '../mariadb-store'

class InterestPointPolicy {
  /**
   * @param { Number } idInterestPoint
   * @returns { Promise<Boolean> }
   */
  static async getUniverseId (idInterestPoint) {
    return (await mariadbStore.client.query(`
      SELECT m.universe_idUniverse FROM interestPoint it
      INNER JOIN map m
        ON m.idMap = it.map_idMap
      WHERE idInterestPoint = ?
      `, idInterestPoint))[0].universe_idUniverse
  }
}

export default InterestPointPolicy
