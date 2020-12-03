import { Router } from 'express'
import getArticles from './ctrl/get.articles.js'
import getArticle from './ctrl/get.article.js'
import getArticleKeyword from './ctrl/get.article.keywords'
import postArticle from './ctrl/post.article.js'
import putArticle from './ctrl/put.article.js'
import deleteArticle from './ctrl/delete.article.js'
const router = Router()

// Get
router.get('/', getArticles)
router.get('/:id', getArticle)
router.get('/:id/keywords', getArticleKeyword)

// Post
router.post('/', postArticle)

// Put
router.put('/:id', putArticle)

// Delete
router.delete('/:id', deleteArticle)

export default router
