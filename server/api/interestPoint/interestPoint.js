import { Router } from 'express'
import getInterestPoints from './ctrl/get.interestPoints.js'
import getInterestPoint from './ctrl/get.interestPoint.js'
import postInterestPoint from './ctrl/post.interestPoint.js'
import putInterestPoint from './ctrl/put.interestPoint.js'
import deleteInterestPoint from './ctrl/delete.interestPoint.js'
const router = Router()

// Get
router.get('/', getInterestPoints)
router.get('/:id', getInterestPoint)

// Post
router.post('/', postInterestPoint)

// Put
router.put('/:id', putInterestPoint)

// Delete
router.delete('/:id', deleteInterestPoint)

export default router
