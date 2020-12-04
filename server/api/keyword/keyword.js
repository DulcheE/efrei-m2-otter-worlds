import { Router } from 'express'
import getKeywords from './ctrl/get.keywords.js'
import getKeyword from './ctrl/get.keyword.js'
import getKeywordsArticle from './ctrl/get.keyword.articles'
import postKeyword from './ctrl/post.keyword.js'
import deleteKeyword from './ctrl/delete.keyword.js'
const router = Router()

// Get
router.get('/', getKeywords)
router.get('/:id', getKeyword)
router.get('/:id/articles', getKeywordsArticle)

// Post
router.post('/', postKeyword)

// Delete
router.delete('/:id', deleteKeyword)

export default router
