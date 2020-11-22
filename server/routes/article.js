import { Router } from 'express'
import getArticles from '../controllers/article/get.articles.js'
import getArticle from '../controllers/article/get.article.js'
import getArticleEvent from '../controllers/article/get.article.event'
import getArticleMaps from '../controllers/article/get.article.maps'
import getArticleInterestPoints from '../controllers/article/get.article.interestPoint'
import postArticle from '../controllers/article/post.article.js'
import putArticle from '../controllers/article/put.article.js'
import deleteArticle from '../controllers/article/delete.article.js'
const router = Router()

// Get
router.get('/', getArticles)
router.get('/:id', getArticle)
router.get('/:id/events', getArticleEvent)
router.get('/:id/maps', getArticleMaps)
router.get('/:id/interestPoints', getArticleInterestPoints)

// Post
router.post('/', postArticle)

// Put
router.put('/:id', putArticle)

// Delete
router.delete('/:id', deleteArticle)

export default router
