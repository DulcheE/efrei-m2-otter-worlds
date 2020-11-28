import { Router } from 'express'
import getArticles from './ctrl/get.articles.js'
import getArticle from './ctrl/get.article.js'
import getArticleEvent from './ctrl/get.article.event'
import getArticleMaps from './ctrl/get.article.maps'
import getArticleInterestPoints from './ctrl/get.article.interestPoint'
import getArticleKeyword from './ctrl/get.article.keywords'
import postArticle from './ctrl/post.article.js'
import putArticle from './ctrl/put.article.js'
import deleteArticle from './ctrl/delete.article.js'
const router = Router()

// Get
router.get('/', getArticles)
router.get('/:id', getArticle)
router.get('/:id/events', getArticleEvent)
router.get('/:id/maps', getArticleMaps)
router.get('/:id/interestPoints', getArticleInterestPoints)
router.get('/:id/keywords', getArticleKeyword)

// Post
router.post('/', postArticle)

// Put
router.put('/:id', putArticle)

// Delete
router.delete('/:id', deleteArticle)

export default router
