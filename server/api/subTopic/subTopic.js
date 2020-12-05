import { Router } from 'express'

import isConnected from '../../middlewares/is-connected.js'
import passwordConfirmation from '../../middlewares/password-confirmation.js'
import { tryTo, emptyError } from '../../middlewares/errors.js'
import SubTopicPolicy from '../../policies/subTopic.policy.js'
import TopicPolicy from '../../policies/topic.policy.js'

import getSubTopics from './ctrl/get.subTopics.js'
import getSubTopic from './ctrl/get.subTopic.js'
import getSubTopicArticles from './ctrl/get.subTopic.articles.js'
import postSubTopic from './ctrl/post.subTopic.js'
import putSubTopic from './ctrl/put.subTopic.js'
import deleteSubTopic from './ctrl/delete.subTopic.js'

const {
  canGetUniverseIndirect,
  canEditUniverseIndirect
} = require('../../middlewares/access-rights.js')

const canGet = canGetUniverseIndirect(SubTopicPolicy.getUniverseId, 'id', 'params')
const canAdd = canEditUniverseIndirect(TopicPolicy.getUniverseId, 'idTopic', 'body')
const canEdit = canEditUniverseIndirect(SubTopicPolicy.getUniverseId, 'id', 'params')

const router = Router()

// Get
router.get('/', tryTo(getSubTopics, emptyError))
router.get('/:id', canGet, tryTo(getSubTopic, emptyError))
router.get('/:id/articles', canGet, tryTo(getSubTopicArticles, emptyError))

// Post
router.post('/', isConnected, canAdd, tryTo(postSubTopic, emptyError))

// Put
router.put('/:id', isConnected, canEdit, tryTo(putSubTopic, emptyError))

// Delete
router.delete('/:id', isConnected, canEdit, passwordConfirmation, tryTo(deleteSubTopic, emptyError))

export default router
