import { Router } from 'express'
import getArticles from '../controllers/article/get.articles.js'
import getArticle from '../controllers/article/get.article.js'
import postArticle from '../controllers/article/post.article.js'
import putArticle from '../controllers/article/put.article.js'
import deleteArticle from '../controllers/article/delete.article.js'
const router = Router()

// Get
router.get('/', getArticles)
router.get('/:id', getArticle)

// Post
router.post('/', postArticle)

// Put
router.put('/:id', putArticle)

// Delete
router.delete('/:id', deleteArticle)

export default router
