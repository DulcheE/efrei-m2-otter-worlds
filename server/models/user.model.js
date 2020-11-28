import { baseAPI } from '../routes/routes'
import mariadbStore from '../mariadb-store'
const hal = require('hal')

export default class User {
  /** @type {Number} */
  idUser
  /** @type {String} */
  username
  /** @type {String} */
  password

  /**
   * @param {User} user
   */
  constructor (user) {
    this.idUser = user.idUser
    this.username = user.username
    this.password = user.password
  }

  asResource (req) {
    const resource = hal.Resource(
      {
        id: this.idUser,
        username: this.username
      },
      `${baseAPI(req)}users/${this.idUser}`)

    resource.link('groups',
      `${baseAPI(req)}users/${this.idUser}/groups`)
    resource.link('universes',
      `${baseAPI(req)}users/${this.idUser}/universes`)
    resource.link('universesPlays',
        `${baseAPI(req)}users/${this.idUser}/universes-plays`)

    return resource
  }

  /**
   * @param req
   * @param users {User[]}
   * @param selfLink {string}
   */
  static asResourceList (req, users, selfLink = 'users') {
    const resourceUsers = []
    for (const user of users) {
      const _user = new User(user)
      resourceUsers.push(_user.asResource(req).toJSON())
    }

    const resource = hal.Resource({ users: resourceUsers }, baseAPI(req) + selfLink)

    return resource
  }

  /**
   * @returns {Promise<User[]>}
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT * FROM user')
  }

  /**
   * @param {Number} id
   * @returns {Promise<User>}
   */
  static async get (id) {
    const conn = (await mariadbStore.client.query('SELECT * FROM user WHERE idUser = ?', id))[0]
    if (!conn) {
      throw new Error(`User ${id} don't exist !`)
    }

    return new User(conn)
  }

  /**
   * @param {String} username
   * @returns {Boolean}
   */
  static async getByName (username) {
    return (await mariadbStore.client.query('SELECT * FROM `user` WHERE username = ?', [username]))[0]
  }

  /**
   * @param {Number} id
   * @returns {Promise<Characters>}
   */
  static async getCharacters (id) {
    return await mariadbStore.client.query('SELECT * FROM `character` WHERE user_idUser = ?', id)
  }

  /**
   * @param {Number} idUser id of the user that we want the groups
   * @param {Number} idUniverse id of the universe that we want the groups for the user
   * @returns {Promise<Groups>}
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
   * @param {Number} id
   * @returns {Promise<Universe>}
   */
  static async getUniverses (id) {
    return await mariadbStore.client.query('SELECT * FROM `universe` WHERE user_idUser = ?', id)
  }

  /**
   * @param {Number} id
   * @returns {Promise<Universe>}
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
   * @param {User} user
   * @returns {Promise<User>}
   */
  static async add (user) {
    const sql = 'INSERT INTO user(username, password) VALUES(?,?)'
    const params = [user.username, user.password]
    const row = await mariadbStore.client.query(sql, params)

    return row.insertId || -1
  }

  /**
   * @param {User} user
   * @returns {Promise<User>}
   */
  static async suppr (user) {
    const sql = 'SELECT * FROM user WHERE idUser = ?'
    const param = [user.idUser]
    const row = await mariadbStore.client.query(sql, param)
    const result = new User(row[0])
    if (result.password === user.password) {
      return await mariadbStore.client.query('DELETE FROM user WHERE idUser = ?', [user.idUser])
    } else {
      throw new Error('wrong passeword')
    }
  }

  /**
   * @param {User} user
   * @return {Promise<User>}
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
   * @param {User} user
   * @param {String} code
   * @param {Number} id
   * @return {Promise<User>}
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
