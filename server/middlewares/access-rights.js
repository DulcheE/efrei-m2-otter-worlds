import CharacterPolicy from '../policies/character.policy.js'
import SubTopicPolicy from '../policies/subTopic.policy.js'
import TopicPolicy from '../policies/topic.policy.js'
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
    try {
      if (!await validate(req)) {
        behaviour(req, res, next)
        return
      }
      next()
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }
}

/**
 * @param { HephaistosRequest } req
 * @param { String } param
 * @param { String } where
 * @return { Number }
 */
const id = (req, param, where) => parseInt(req[where][param])

/**
 * @param { function(Number, Number): Promise<Boolean> } policy
 * @return { function(String, String) : ExpressMiddleware }
 */
function withId (policy) {
  return (param, where = 'params') =>
    gate(req => policy(req.session.idUser, id(req, param, where)), unauthorized)
}

/**
 * @param { function(Number, Number): Promise<Boolean> } policy
 * @return { function(String, String) : ExpressMiddleware }
 */
function withIndirectId (policy) {
  return (method, param, where = 'params') =>
    gate(req =>
      method(id(req, param, where))
        .then(idUniverse => policy(req.session.idUser, idUniverse))
    , unauthorized)
}

/**
 * @param { function(Number, Number): Promise<Boolean> } policy
 * @return { function(String, String) : ExpressMiddleware }
 */
function withBody (policy) {
  return gate(req => policy(req.session.idUser, req.body), unauthorized)
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
  canGetSubTopic: withId(SubTopicPolicy.canGet),
  verifySubTopic: withBody(SubTopicPolicy.verify),
  canGetTopic: withId(TopicPolicy.canGet),
  verifyTopic: withBody(TopicPolicy.verify),
  canGetUniverse: withId(UniversePolicy.canGet),
  canEditUniverse: withId(UniversePolicy.canEdit),
  canGetUniverseIndirect: withIndirectId(UniversePolicy.canGet),
  canEditUniverseIndirect: withIndirectId(UniversePolicy.canEdit),
  isUniverseOwner: withId(UniversePolicy.isOwner),
  isUser: withId(UserPolicy.isUser),
  isUserIndirect: withIndirectId(UserPolicy.isUser),
  verifyStat: withBody(CharacterPolicy.verifyStat)
}

// canEditSessionAttempt: withIdSkip(SessionAttemptPolicy.canEdit),
// canEditSessionAttempt: simpleRight(SessionAttemptPolicy.canEdit),
