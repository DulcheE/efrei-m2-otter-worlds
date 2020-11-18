import { Router } from 'express'
import getTemplates from '../controllers/template/get.templates.js'
import getTemplate from '../controllers/template/get.template.js'
import postTemplate from '../controllers/template/post.template.js'
import putTemplate from '../controllers/template/put.template.js'
import deleteTemplate from '../controllers/template/delete.template.js'
const router = Router()

// Get
router.get('/', getTemplates)
router.get('/:id', getTemplate)

// Post
router.post('/', postTemplate)

// Put
router.put('/:id', putTemplate)

// Delete
router.delete('/:id', deleteTemplate)

export default router
