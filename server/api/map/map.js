import { Router } from 'express'
import getMaps from './ctrl/get.maps.js'
import getMap from './ctrl/get.map.js'
import getInterestPoint from './ctrl/get.map.interestPoint.js'
import postMap from './ctrl/post.map.js'
import putMap from './ctrl/put.map.js'
import deleteMap from './ctrl/delete.map.js'
const router = Router()

// Get
router.get('/', getMaps)
router.get('/:id', getMap)
router.get('/:id/interest-points', getInterestPoint)

// Post
router.post('/', postMap)

// Put
router.put('/:id', putMap)

// Delete
router.delete('/:id', deleteMap)

export default router
