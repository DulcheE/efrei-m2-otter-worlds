import UniversePolicy from '../policies/universe.policy.js'
import UserPolicy from '../policies/user.policy'

/** @typedef { import('express').Request } ExpressRequest */
/** @typedef { import('express').Response } ExpressResponse */
/** @typedef { import('express').NextFunction } NextFunction  */
/** @typedef { function(ExpressRequest, ExpressResponse?, NextFunction?) : Promise<void> } ExpressMiddleware */
/** @typedef { function(ExpressRequest) : Promise<Boolean> } Validator */
/** @typedef { function(ExpressRequest, ExpressResponse?, NextFunction?) : void } Behaviour */

/** @type { ExpressMiddleware } */
const unauthorized = (req, res) => { res.sendStatus(401) }
// /** @type { ExpressMiddleware } */
// const skip = (req, res, next) => { next('route') }

/**
 * @param { Validator } validate
 * @param { Behaviour } behaviour
 * @return { ExpressMiddleware }
 */
function gate (validate, behaviour) {
  return async function middleware (req, res, next) {
    if (!await validate(req)) {
      behaviour(req, res, next)
      return
    }
    next()
  }
}

/**
 * @param { HephaistosRequest } req
 * @param { String } param
 * @param { String } where
 * @return { Number }
 */
const id = (req, param, where) => req[where][param]

/**
 * @param { function(Number, Number): Promise<Boolean> } policy
 * @return { function(String, String) : ExpressMiddleware }
 */
function withId (policy) {
  return (param, where = 'params') =>
    gate(req => policy(req.session.idUser, id(req, param, where)), unauthorized)
}

// /**
//  * @param { function(Number, Number): Promise<Boolean> } policy
//  * @return { function(String, String) : ExpressMiddleware }
//  */
// function withIdSkip (policy) {
//   return (param, where = 'params') =>
//     gate(req => policy(req.session.idUser, id(req, param, where)), skip)
// }

module.exports = {
  canGetUniverse: withId(UniversePolicy.canGet),
  canEditUniverse: withId(UniversePolicy.canEdit),
  isUniverseOwner: withId(UniversePolicy.isOwner),
  isUser: withId(UserPolicy.isUser)
}

// canEditSessionAttempt: withIdSkip(SessionAttemptPolicy.canEdit),
// canEditSessionAttempt: simpleRight(SessionAttemptPolicy.canEdit),