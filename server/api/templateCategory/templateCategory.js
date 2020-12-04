import { Router } from 'express'
import getTemplateCategories from './ctrl/get.templateCategories.js'
import getTemplateCategory from './ctrl/get.templateCategory.js'
import getTemplateCategoryTemplateStats from './ctrl/get.templateCategory.templateStats.js'
import postTemplateCategory from './ctrl/post.templateCategory.js'
import putTemplateCategory from './ctrl/put.templateCategory.js'
import deleteTemplateCategory from './ctrl/delete.templateCategory.js'
const router = Router()

// Get
router.get('/', getTemplateCategories)
router.get('/:id', getTemplateCategory)
router.get('/:id/template-stats', getTemplateCategoryTemplateStats)

// Post
router.post('/', postTemplateCategory)

// Put
router.put('/:id', putTemplateCategory)

// Delete
router.delete('/:id', deleteTemplateCategory)

export default router
