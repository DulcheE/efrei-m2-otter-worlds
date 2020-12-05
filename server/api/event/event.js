import { Router } from 'express'

import isConnected from '../../middlewares/is-connected.js'
import { tryTo, emptyError } from '../../middlewares/errors.js'
import EventPolicy from '../../policies/event.policy.js'
import TimelinePolicy from '../../policies/timeline.policy.js'

import getEvents from './ctrl/get.events.js'
import getEvent from './ctrl/get.event.js'
import postEvent from './ctrl/post.event.js'
import putEvent from './ctrl/put.event.js'
import deleteEvent from './ctrl/delete.events.js'

const {
  canGetUniverseIndirect,
  canEditUniverseIndirect
} = require('../../middlewares/access-rights.js')

const canGet = canGetUniverseIndirect(EventPolicy.getUniverseId, 'id', 'params')
const canAdd = canEditUniverseIndirect(TimelinePolicy.getUniverseId, 'idTimeline', 'body')
const canEdit = canEditUniverseIndirect(EventPolicy.getUniverseId, 'id', 'params')

const router = Router()

// Get
router.get('/', tryTo(getEvents, emptyError))
router.get('/:id', canGet, tryTo(getEvent, emptyError))

// Post
router.post('/', isConnected, canAdd, tryTo(postEvent, emptyError))

// Put
router.put('/:id', isConnected, canEdit, tryTo(putEvent, emptyError))

// Delete
router.delete('/:id', isConnected, canEdit, tryTo(deleteEvent, emptyError))

export default router
