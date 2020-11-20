import { Router } from 'express'
import getEvents from '../controllers/event/get.events.js'
import getEvent from '../controllers/event/get.event.js'
import postEvent from '../controllers/event/post.event.js'
import putEvent from '../controllers/event/put.event.js'
import deleteEvent from '../controllers/event/delete.events.js'

const router = Router()

router.get('/', getEvents)
router.get('/:id', getEvent)

router.post('/', postEvent)

router.put('/:id', putEvent)

router.delete('/:id', deleteEvent)

export default router
