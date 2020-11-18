import { Router } from 'express'
import getTemplateCategories from '../controllers/templatecategory/get.templatecategories.js'
import getTemplateCategory from '../controllers/templatecategory/get.templatecategory.js'
import postTemplateCategory from '../controllers/templatecategory/post.templatecategory.js'
import putTemplateCategory from '../controllers/templatecategory/put.templatecategory.js'
import deleteTemplateCategory from '../controllers/templatecategory/delete.templatecategory.js'
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
