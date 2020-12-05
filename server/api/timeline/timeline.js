import { Router } from 'express'

import isConnected from '../../middlewares/is-connected.js'
import passwordConfirmation from '../../middlewares/password-confirmation.js'
import { tryTo, emptyError } from '../../middlewares/errors.js'
import TimelinePolicy from '../../policies/timeline.policy.js'

import getTimelines from './ctrl/get.timelines.js'
import postTimeline from './ctrl/post.timeline.js'
import putTimeline from './ctrl/put.timeline.js'
import deleteTimeline from './ctrl/delete.timeline.js'
import getTimeline from './ctrl/get.timeline.js'
import getTimelineEvent from './ctrl/get.timelines.events.js'

const {
  canEditUniverse,
  canGetUniverseIndirect,
  canEditUniverseIndirect
} = require('../../middlewares/access-rights.js')

const canGet = canGetUniverseIndirect(TimelinePolicy.getUniverseId, 'id', 'params')
const canEdit = canEditUniverseIndirect(TimelinePolicy.getUniverseId, 'id', 'params')

const router = Router()

// Get
router.get('/', tryTo(getTimelines, emptyError))
router.get('/:id', isConnected, canGet, tryTo(getTimeline, emptyError))
router.get('/:id/events', isConnected, canGet, tryTo(getTimelineEvent, emptyError))

// Post
router.post('/', isConnected, canEditUniverse('idUniverse', 'body'), tryTo(postTimeline, emptyError))

// Put
router.put('/:id', isConnected, canEdit, tryTo(putTimeline, emptyError))

// Delete
router.delete('/:id', isConnected, canEdit, passwordConfirmation, tryTo(deleteTimeline, emptyError))

export default router
