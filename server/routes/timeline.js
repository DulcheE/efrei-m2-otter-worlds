import { Router } from 'express'
import getTimelines from '../controllers/timeline/get.timelines.js'
import postTimeline from '../controllers/timeline/post.timeline.js'
import putTimeline from '../controllers/timeline/put.timeline.js'
import deleteTimeline from '../controllers/timeline/delete.timeline.js'

const router = Router()

router.get('/', getTimelines)
router.post('/', postTimeline)
router.put('/:id', putTimeline)
router.delete('/:id', deleteTimeline)
export default router
