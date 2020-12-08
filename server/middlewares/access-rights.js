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

/** @type { Behaviour } */
const unauthorized = (req, res) => { res.sendStatus(401) }
/** @type { Behaviour } */
const skip = (req, res, next) => { next('route') }

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
 * @param { Behaviour } behaviour
 * @return { function(String, String) : ExpressMiddleware }
 */
function withId (policy, behaviour) {
  return (param, where = 'params') =>
    gate(req => policy(req.session.idUser, id(req, param, where)), behaviour)
}

/**
 * @param { function(Number, Number): Promise<Boolean> } policy
 * @param { Behaviour } behaviour
 * @return { function(String, String) : ExpressMiddleware }
 */
function withIndirectId (policy, behaviour) {
  return (method, param, where = 'params') =>
    gate(req =>
      method(id(req, param, where))
        .then(idUniverse => policy(req.session.idUser, idUniverse))
    , behaviour)
}

/**
 * @param { function(Number, Number): Promise<Boolean> } policy
 * @param { Behaviour } behaviour
 * @return { function(String, String) : ExpressMiddleware }
 */
function withBody (policy, behaviour) {
  return gate(req => policy(req.session.idUser, req.body), behaviour)
}

/**
 * @param { function(Number, Number): Promise<Boolean> } policy
 * @param { Behaviour } behaviour
 * @return { function(String, String) : ExpressMiddleware }
 */
function withIdBody (policy, behaviour) {
  return (param, where = 'params') =>
    gate(req => policy(req.session.idUser, id(req, param, where), req.body), behaviour)
}

module.exports = {
  canGetSubTopic: withId(SubTopicPolicy.canGet, unauthorized),
  verifySubTopic: withBody(SubTopicPolicy.verify, unauthorized),
  canGetTopic: withId(TopicPolicy.canGet, unauthorized),
  verifyTopic: withBody(TopicPolicy.verify, unauthorized),
  canGetUniverse: withId(UniversePolicy.canGet, unauthorized),
  canEditUniverse: withId(UniversePolicy.canEdit, unauthorized),
  canGetUniverseIndirect: withIndirectId(UniversePolicy.canGet, unauthorized),
  canEditUniverseIndirect: withIndirectId(UniversePolicy.canEdit, unauthorized),
  canEditUniverseIndirectSkip: withIndirectId(UniversePolicy.canEdit, skip),
  isUniverseOwner: withId(UniversePolicy.isOwner, unauthorized),
  isUser: withId(UserPolicy.isUser, unauthorized),
  isUserIndirect: withIndirectId(UserPolicy.isUser, unauthorized),
  verifyStat: withIdBody(CharacterPolicy.verifyStat, unauthorized)
}
