import { Router } from 'express'
import getMaps from '../controllers/map/get.maps.js'
import getTemplate from '../controllers/template/get.template.js'
import postMap from '../controllers/map/post.map.js'
import putMap from '../controllers/map/put.map.js'
import deleteMap from '../controllers/map/delete.map.js'
const router = Router()

// Get
router.get('/', getMaps)
router.get('/:id', getTemplate)

// Post
router.post('/', postMap)

// Put
router.put('/:id', putMap)

// Delete
router.delete('/:id', deleteMap)

export default router
