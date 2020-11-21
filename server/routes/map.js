import { Router } from 'express'
import getMaps from '../controllers/map/get.maps.js'
import getMap from '../controllers/map/get.map.js'
import getInterestPoint from '../controllers/map/get.map.interestPoint.js'
import postMap from '../controllers/map/post.map.js'
import putMap from '../controllers/map/put.map.js'
import deleteMap from '../controllers/map/delete.map.js'
const router = Router()

// Get
router.get('/', getMaps)
router.get('/:id', getMap)
router.get('/:id/interestPoint', getInterestPoint)

// Post
router.post('/', postMap)

// Put
router.put('/:id', putMap)

// Delete
router.delete('/:id', deleteMap)

export default router
