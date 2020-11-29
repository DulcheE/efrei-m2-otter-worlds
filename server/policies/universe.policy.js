import Universe from '../models/universe.model.js'
import mariadbStore from '../mariadb-store'

class UniversePolicy {
  /**
   * @param {Number} idUser
   * @param {Number} idUniverse
   * @returns {Promise<Boolean>}
   */
  static async canGet (idUser, idUniverse) {
    const sql = `
      SELECT u.bIsPublic, uiu.idUser FROM universe u
      LEFT JOIN (
        SELECT * FROM userinuniverse
        WHERE idUniverse = ? AND idUser = ?
        ) AS uiu ON uiu.idUniverse = u.idUniverse 
      WHERE u.idUniverse = ?
    `
    const param = [idUniverse, idUser || 0, idUniverse]
    const result = (await mariadbStore.client.query(sql, param))[0]

    if (result.bIsPublic) {
      return true
    }
    return result.idUser === idUser
  }

  /**
   * @param {Number} idUser
   * @param {Number} idUniverse
   * @returns {Promise<Boolean>}
   */
  static async canEdit (idUser, idUniverse) {
    const sql = `
      SELECT u.bIsPublic, uiu.bIsGM FROM universe u
      LEFT JOIN (
        SELECT * FROM userinuniverse
        WHERE idUniverse = ? AND idUser = ?
        ) AS uiu ON uiu.idUniverse = u.idUniverse 
      WHERE u.idUniverse = ?
    `
    const param = [idUniverse, idUser, idUniverse]
    const result = (await mariadbStore.client.query(sql, param))[0]

    return result.bIsGM === 1
  }

  /**
   * @param {Number} idUser
   * @param {Number} idUniverse
   * @returns {Promise<Boolean>}
   */
  static async isOwner (idUser, idUniverse) {
    const sql = `
      SELECT 1 FROM universe
      WHERE idUniverse = ? AND user_idUser = ?
    `
    const param = [idUniverse, idUser]
    const result = await mariadbStore.client.query(sql, param)

    return !!result
  }
}

export default UniversePolicy
