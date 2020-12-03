import mariadbStore from '../mariadb-store'
import { HalResource, HalResourceData, HalToOneLinks } from '../middlewares/hal-parser.js'

class HalResourceDataUser extends HalResourceData {
  /** @type { String } */
  username
}

class HalToOneLinksUser extends HalToOneLinks { }

export default class User extends HalResource {
  /** @type { HalResourceDataUser } */
  data
  /** @type { HalToOneLinksUser } */
  toOneLinks
  /** @type { String[] } */
  static toManyLinks = ['groups', 'universes', 'universes-plays']

  /**
   * @param { User } user
   */
  constructor (user) {
    super()

    this.id = user.idUser || user.id

    this.data = new HalResourceDataUser()
    this.data.username = user.username || user.data.username

    this.toOneLinks = new HalToOneLinksUser()
  }

  /**
   * @param { String } baseAPI
   * @param { String } resourcePath
   */
  asResource (baseAPI, resourcePath = 'users') {
    return super.asResource(baseAPI, resourcePath)
  }

  /**
   * @param { String } baseAPI
   * @param { HalResource[] } list
   * @param { String } selfLink
   * @param { String } resourcePath
   */
  static asResourceList (baseAPI, list, selfLink = 'users', resourcePath = 'users') {
    return super.asResourceList(baseAPI, list, selfLink, resourcePath, User)
  }

  /// GET

  /**
   * @returns { Promise<User[]> }
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT idUser, username FROM user')
  }

  /**
   * @param { Number } id id of the user
   * @returns { Promise<User> }
   */
  static async get (id) {
    const conn = (await mariadbStore.client.query('SELECT * FROM user WHERE idUser = ?', id))[0]
    if (!conn) {
      throw new Error(`User ${id} don't exist !`)
    }

    return new User(conn)
  }

  /**
   * @param { String } username
   * @returns { Promise<User> }
   */
  static async getByName (username) {
    return new User((await mariadbStore.client.query('SELECT * FROM `user` WHERE username = ?', [username]))[0])
  }

  /**
   * @param { Number } id id of the universe
   * @returns { Promise<User[]> }
   */
  static async getUsersPlayingInUniverse (id) {
    return await mariadbStore.client.query(`
      SELECT u.*, uin.bIsGM FROM user u
      INNER JOIN userinuniverse uin
        ON uin.idUser = u.idUser
      WHERE idUniverse = ?
    `, id)
  }

  /// POST

  /**
   * @param { { username: String, password: String } } user
   * @returns { Promise<User> }
   */
  static async add (user) {
    const sql = `
      INSERT INTO
        user(username, password)
        VALUES(?, ?)
      RETURNING *`
    const params = [user.username, user.password]

    return new User((await mariadbStore.client.query(sql, params))[0])
  }

  /// PUT

  /**
   * @param { String } password
   * @param { Number } id id of the user
   * @return { Promise<User> }
   */
  static async changePasseword (password, id) {
    return await mariadbStore.client.query('UPDATE user SET password = ? WHERE idUser = ?', [password, id])
  }

  /// DELETE

  /**
   * @param { Number } idUser
   * @returns { Promise<User> }
   */
  static async remove (idUser) {
    return await mariadbStore.client.query('DELETE FROM user WHERE idUser = ?', [idUser])
  }
}
