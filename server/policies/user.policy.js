
class UserPolicy {
  /**
   * @param { Number } idUser1
   * @param { Number } idUser2
   * @returns { Promise<Boolean> }
   */
  static isUser (idUser1, idUser2) {
    return idUser1 === parseInt(idUser2)
  }
}

export default UserPolicy
