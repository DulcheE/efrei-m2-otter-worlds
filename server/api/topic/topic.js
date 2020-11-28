import { Router } from 'express'
import getTopics from './ctrl/get.topics.js'
import getTopic from './ctrl/get.topic.js'
import getTopicSubTopics from './ctrl/get.topic.subTopics.js'
import postTopic from './ctrl/post.topic.js'
import putTopic from './ctrl/put.topic.js'
import deleteTopic from './ctrl/delete.topic.js'
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
