import { Router } from 'express'
import getEvents from './ctrl/get.events.js'
import getEvent from './ctrl/get.event.js'
import postEvent from './ctrl/post.event.js'
import putEvent from './ctrl/put.event.js'
import deleteEvent from './ctrl/delete.events.js'

const router = Router()

router.get('/', getEvents)
router.get('/:id', getEvent)

router.post('/', postEvent)

router.put('/:id', putEvent)

router.delete('/:id', deleteEvent)

export default router
