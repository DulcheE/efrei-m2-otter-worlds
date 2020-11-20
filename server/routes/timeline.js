import { Router } from 'express'
import getTimelines from '../controllers/timeline/get.timelines.js'
import postTimeline from '../controllers/timeline/post.timeline.js'
import putTimeline from '../controllers/timeline/put.timeline.js'
import deleteTimeline from '../controllers/timeline/delete.timeline.js'
import getTimeline from '../controllers/timeline/get.timeline.js'
import getTimelineEvent from '../controllers/timeline/get.timelines.events.js'

const router = Router()

router.get('/', getTimelines)
router.get('/:id', getTimeline)
router.get('/:id/events', getTimelineEvent)
router.post('/', postTimeline)
router.put('/:id', putTimeline)
router.delete('/:id', deleteTimeline)
export default router
