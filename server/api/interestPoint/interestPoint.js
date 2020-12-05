import { Router } from 'express'

import isConnected from '../../middlewares/is-connected.js'
import { tryTo, emptyError } from '../../middlewares/errors.js'
import InterestPointPolicy from '../../policies/interestPoint.policy.js'
import MapPolicy from '../../policies/map.policy.js'

import getInterestPoints from './ctrl/get.interestPoints.js'
import getInterestPoint from './ctrl/get.interestPoint.js'
import postInterestPoint from './ctrl/post.interestPoint.js'
import putInterestPoint from './ctrl/put.interestPoint.js'
import deleteInterestPoint from './ctrl/delete.interestPoint.js'

const {
  canGetUniverseIndirect,
  canEditUniverseIndirect
} = require('../../middlewares/access-rights.js')

const canGet = canGetUniverseIndirect(InterestPointPolicy.getUniverseId, 'id', 'params')
const canAdd = canEditUniverseIndirect(MapPolicy.getUniverseId, 'idMap', 'body')
const canEdit = canEditUniverseIndirect(InterestPointPolicy.getUniverseId, 'id', 'params')

const router = Router()

// Get
router.get('/', tryTo(getInterestPoints, emptyError))
router.get('/:id', canGet, tryTo(getInterestPoint, emptyError))

// Post
router.post('/', isConnected, canAdd, tryTo(postInterestPoint, emptyError))

// Put
router.put('/:id', isConnected, canEdit, tryTo(putInterestPoint, emptyError))

// Delete
router.delete('/:id', isConnected, canEdit, tryTo(deleteInterestPoint, emptyError))

export default router
