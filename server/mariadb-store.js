const mariadb = require('mariadb')

class Mariadb {
  /** @type { import('mariadb').Pool } */
  pool;
  /** @type { Promise<PoolConnection> } */
  client;
  /** @type { Promise<PoolConnection> } */
  connection;

  /**
   * @param { import('mariadb').ClientConfig } config
   */
  async init (config) {
    this.pool = mariadb.createPool(config)
    this.client = await this.pool.getConnection()
  }

  /* close() {
    if (this.client) {
      this.client.release();
    }
    this.client = null;
    if (this.pool) {
      this.pool.end();
    }
    this.pool = null
  } */
}

exports.mariadbStore = new Mariadb()
