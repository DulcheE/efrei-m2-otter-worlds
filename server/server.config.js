let existingConf
try {
  existingConf = require('./local.server.config.js')
} catch (err) {
  existingConf = {}
}

function e (param) {
  return process.env[param] || existingConf[param] || ''
}
export default {
  SESSION_SECRET: e('SESSION_SECRET'),
  MARIADB: {
    host: e('DB_HOST'),
    database: e('DB_DATABASE'),
    user: e('DB_USER'),
    password: e('DB_PASSWORD')
  }
}
