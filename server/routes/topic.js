import { Router } from 'express'
import getTopics from '../controllers/topic/get.topics.js'
import getTopic from '../controllers/topic/get.topic.js'
import getTopicSubTopics from '../controllers/topic/get.topic.subtopics.js'
import postTopic from '../controllers/topic/post.topic.js'
import putTopic from '../controllers/topic/put.topic.js'
import deleteTopic from '../controllers/topic/delete.topic.js'
const router = Router()

// Get
router.get('/', getTopics)
router.get('/:id', getTopic)
router.get('/:id/sub-topics', getTopicSubTopics)

// Post
router.post('/', postTopic)

// Put
router.put('/:id', putTopic)

// Delete
router.delete('/:id', deleteTopic)

export default router
