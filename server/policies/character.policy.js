import mariadbStore from '../mariadb-store'

class CharacterPolicy {
  /**
   * @param { Number } idCharacter
   * @returns { Promise<Boolean> }
   */
  static async getUniverseId (idCharacter) {
    return (await mariadbStore.client.query('SELECT universe_idUniverse FROM `character` WHERE idCharacter = ?', idCharacter))[0].universe_idUniverse
  }

  /**
   * @param { Number } idCharacter
   * @returns { Promise<Boolean> }
   */
  static async getUserId (idCharacter) {
    return (await mariadbStore.client.query('SELECT user_idUser FROM `character` WHERE idCharacter = ?', idCharacter))[0].user_idUser
  }
}

export default CharacterPolicy
