import { Router } from 'express'

import isConnected from '../../middlewares/is-connected.js'
import passwordConfirmation from '../../middlewares/password-confirmation.js'
import { tryTo, emptyError } from '../../middlewares/errors.js'
import TopicPolicy from '../../policies/topic.policy.js'

import getTopics from './ctrl/get.topics.js'
import getTopic from './ctrl/get.topic.js'
import getTopicSubTopics from './ctrl/get.topic.subTopics.js'
import postTopic from './ctrl/post.topic.js'
import putTopic from './ctrl/put.topic.js'
import deleteTopic from './ctrl/delete.topic.js'

const {
  canGetTopic,
  verifyTopic,
  canEditUniverse,
  canGetUniverseIndirect,
  canEditUniverseIndirect
} = require('../../middlewares/access-rights.js')

const canGet = canGetUniverseIndirect(TopicPolicy.getUniverseId, 'id', 'params')
const canEdit = canEditUniverseIndirect(TopicPolicy.getUniverseId, 'id', 'params')

const router = Router()

// Get
router.get('/', tryTo(getTopics, emptyError))
router.get('/:id', canGetTopic('id', 'params'), canGet, tryTo(getTopic, emptyError))
router.get('/:id/sub-topics', canGetTopic('id', 'params'), canGet, tryTo(getTopicSubTopics, emptyError))

// Post
router.post('/', isConnected, verifyTopic, canEditUniverse('idUniverse', 'body'), tryTo(postTopic, emptyError))

// Put
router.put('/:id', isConnected, verifyTopic, canGetTopic('id', 'params'), canEdit, tryTo(putTopic, emptyError))

// Delete
router.delete('/:id', isConnected, canGetTopic('id', 'params'), canEdit, passwordConfirmation, tryTo(deleteTopic, emptyError))

export default router
