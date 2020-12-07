import { mariadbStore } from '../mariadb-store.js'

class InventoryPolicy {
  /**
   * @param { Number } idInventory
   * @returns { Promise<Boolean> }
   */
  static async getUniverseId (idInventory) {
    return (await mariadbStore.client.query(`
      SELECT c.universe_idUniverse FROM Inventory i
      INNER JOIN \`character\` c
        ON c.idCharacter = i.character_idCharacter
      WHERE idInventory = ?
      `, idInventory))[0].universe_idUniverse
  }

  /**
   * @param { Number } idInventory
   * @returns { Promise<Boolean> }
   */
  static async getUserId (idInventory) {
    return (await mariadbStore.client.query(`
      SELECT c.user_idUser FROM Inventory i
      INNER JOIN \`character\` c
        ON c.idCharacter = i.character_idCharacter
      WHERE idInventory = ?
      `, idInventory))[0].user_idUser
  }
}

export default InventoryPolicy
