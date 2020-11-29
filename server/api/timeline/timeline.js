import { Router } from 'express'
import getTimelines from './ctrl/get.timelines.js'
import postTimeline from './ctrl/post.timeline.js'
import putTimeline from './ctrl/put.timeline.js'
import deleteTimeline from './ctrl/delete.timeline.js'
import getTimeline from './ctrl/get.timeline.js'
import getTimelineEvent from './ctrl/get.timelines.events.js'

const router = Router()

router.get('/', getTimelines)
router.get('/:id', getTimeline)
router.get('/:id/events', getTimelineEvent)
router.post('/', postTimeline)
router.put('/:id', putTimeline)
router.delete('/:id', deleteTimeline)
export default router
