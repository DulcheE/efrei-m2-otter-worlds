import { Router } from 'express'
import getTemplateCategories from '../controllers/templateCategory/get.templateCategories.js'
import getTemplateCategory from '../controllers/templateCategory/get.templateCategory.js'
import postTemplateCategory from '../controllers/templateCategory/post.templateCategory.js'
import putTemplateCategory from '../controllers/templateCategory/put.templateCategory.js'
import deleteTemplateCategory from '../controllers/templateCategory/delete.templateCategory.js'
const router = Router()

// Get
router.get('/', getTemplateCategories)
router.get('/:id', getTemplateCategory)

// Post
router.post('/', postTemplateCategory)

// Put
router.put('/:id', putTemplateCategory)

// Delete
router.delete('/:id', deleteTemplateCategory)

export default router
