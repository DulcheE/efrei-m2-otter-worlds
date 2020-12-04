import { Router } from 'express'
import getSubTopics from './ctrl/get.subTopics.js'
import getSubTopic from './ctrl/get.subTopic.js'
import getSubTopicArticles from './ctrl/get.subTopic.articles.js'
import postSubTopic from './ctrl/post.subTopic.js'
import putSubTopic from './ctrl/put.subTopic.js'
import deleteSubTopic from './ctrl/delete.subTopic.js'
const router = Router()

// Get
router.get('/', getSubTopics)
router.get('/:id', getSubTopic)
router.get('/:id/articles', getSubTopicArticles)

// Post
router.post('/', postSubTopic)

// Put
router.put('/:id', putSubTopic)

// Delete
router.delete('/:id', deleteSubTopic)

export default router
