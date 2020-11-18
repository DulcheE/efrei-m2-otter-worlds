import { Router } from 'express'
import getSubTopics from '../controllers/subTopic/get.subTopics.js'
import getSubTopic from '../controllers/subTopic/get.subTopic.js'
import postSubTopic from '../controllers/subTopic/post.subTopic.js'
import putSubTopic from '../controllers/subTopic/put.subTopic.js'
import deleteSubTopic from '../controllers/subTopic/delete.subTopic.js'
const router = Router()

// Get
router.get('/', getSubTopics)
router.get('/:id', getSubTopic)

// Post
router.post('/', postSubTopic)

// Put
router.put('/:id', putSubTopic)

// Delete
router.delete('/:id', deleteSubTopic)

export default router
