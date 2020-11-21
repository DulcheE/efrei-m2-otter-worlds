import { Router } from 'express'
import getInterestPoints from '../controllers/interestPoint/get.interestPoints.js'
import getInterestPoint from '../controllers/interestPoint/get.interestPoint.js'
import postInterestPoint from '../controllers/interestPoint/post.interestPoint.js'
import putInterestPoint from '../controllers/interestPoint/put.interestPoint.js'
import deleteInterestPoint from '../controllers/interestPoint/delete.interestPoint.js'
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
