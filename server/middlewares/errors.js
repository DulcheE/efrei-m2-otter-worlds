
/** @typedef { function(import('express').Request?, import('express').Response?, import('express').NextFunction?, Error) : void } ErrorMiddleware */

/**
 * @param { import('express').RequestHandler } fn
 * @param { ErrorMiddleware } errors
 * @returns { import('express').RequestHandler }
 */
function tryTo (fn, errors) {
  /** @param { import('express').Request } req */
  async function middleware (req, res, next) {
    try {
      await fn(req, res, next)
    } catch (err) {
      errors(req, res, next, err)
    }
  }

  return middleware
}

/**
 * @type { ErrorMiddleware }
 */
function emptyError (req, res, next, err) {
  console.log('Request errored', err) // eslint-disable-line
  res.sendStatus(500)
}

module.exports = { tryTo, emptyError }
