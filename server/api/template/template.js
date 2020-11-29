import { Router } from 'express'
import getTemplates from './ctrl/get.templates.js'
import getTemplate from './ctrl/get.template.js'
import postTemplate from './ctrl/post.template.js'
import putTemplate from './ctrl/put.template.js'
import deleteTemplate from './ctrl/delete.template.js'
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
