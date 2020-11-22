import { Router } from 'express'
import getKeywords from '../controllers/keyword/get.keywords.js'
import getKeyword from '../controllers/keyword/get.keyword.js'
import getKeywordsArticle from '../controllers/keyword/get.keyword.articles'
import postKeyword from '../controllers/keyword/post.keyword.js'
import putKeyword from '../controllers/keyword/put.keyword.js'
import deleteKeyword from '../controllers/keyword/delete.keyword.js'
const router = Router()

// Get
router.get('/', getKeywords)
router.get('/:id', getKeyword)
router.get('/:id/articles', getKeywordsArticle)

// Post
router.post('/', postKeyword)

// Put
router.put('/:id', putKeyword)

// Delete
router.delete('/:id', deleteKeyword)

export default router
