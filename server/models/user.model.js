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

  /**
   * @returns { Promise<User[]> }
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT idUser, username FROM user')
  }

  /**
   * @param { Number } id
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
   * @returns { Object }
   */
  static async getByName (username) {
    return (await mariadbStore.client.query('SELECT * FROM `user` WHERE username = ?', [username]))[0]
  }

  /**
   * @param { Number } id
   * @returns { Promise<Characters> }
   */
  static async getCharacters (id) {
    return await mariadbStore.client.query('SELECT * FROM `character` WHERE user_idUser = ?', id)
  }

  /**
   * @param { Number } idUser id of the user that we want the groups
   * @param { Number } idUniverse id of the universe that we want the groups for the user
   * @returns { Promise<Groups> }
   */
  static async getGroups (idUser, idUniverse) {
    return await mariadbStore.client.query(`
      SELECT g.idGroup, g.name, g.universe_idUniverse FROM \`group\` g
      INNER JOIN characterInGroup cg
        ON cg.group_idGroup = g.idGroup
      INNER JOIN \`character\` c
        ON c.idCharacter = cg.character_idCharacter
      WHERE c.user_idUser = ? AND g.universe_idUniverse = ?
    `, [idUser, idUniverse])
  }

  /**
   * @param { Number } id
   * @returns { Promise<Universe> }
   */
  static async getUniverses (id) {
    return await mariadbStore.client.query('SELECT * FROM `universe` WHERE user_idUser = ?', id)
  }

  /**
   * @param { Number } id
   * @returns { Promise<import('./universe.model').default[]> }
   */
  static async getUniversesPlays (id) {
    return await mariadbStore.client.query(`
      SELECT u.*, uin.bIsGM FROM universe u
      INNER JOIN userinuniverse uin
        ON uin.idUniverse = u.idUniverse
      WHERE idUser = ?
    `, id)
  }

  /**
   * @param { User } user
   * @returns { Promise<User> }
   */
  static async add (user) {
    const sql = 'INSERT INTO user(username, password) VALUES(?,?)'
    const params = [user.username, user.password]
    const row = await mariadbStore.client.query(sql, params)

    return row.insertId || -1
  }

  /**
   * @param { Number } idUser
   * @returns { Promise<User> }
   */
  static async remove (idUser) {
    return await mariadbStore.client.query('DELETE FROM user WHERE idUser = ?', [idUser])
  }

  /**
   * @param { User } user
   * @return { Promise<User> }
   */
  static async modifyName (user, id) {
    const sql = 'SELECT * FROM user WHERE idUser = ?'
    const param = [id]
    const row = await mariadbStore.client.query(sql, param)
    const result = new User(row[0])
    if (result.password === user.password) {
      return await mariadbStore.client.query('UPDATE user SET username = ? WHERE idUSer = ?', [user.username, id])
    } else {
      throw new Error('wrong passeword')
    }
  }

  /**
   * @param { User } user
   * @param { String } code
   * @param { Number } id
   * @return { Promise<User> }
   */
  static async ChangePasseword (user, code, id) {
    const sql = 'SELECT * FROM user WHERE idUser = ?'
    const param = [id]
    const row = await mariadbStore.client.query(sql, param)
    const result = new User(row[0])
    if (result.password === code) {
      return await mariadbStore.client.query('UPDATE user SET password = ? WHERE idUSer = ?', [user.password, id])
    } else {
      throw new Error('wrong passeword')
    }
  }
}
