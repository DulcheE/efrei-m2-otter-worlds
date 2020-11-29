import { Router } from 'express'
import getTemplateStats from './ctrl/get.templateStats.js'
import getTemplateStat from './ctrl/get.templateStat.js'
import postTemplateStat from './ctrl/post.templateStat.js'
import putTemplateStat from './ctrl/put.templateStat.js'
import deleteTemplateStat from './ctrl/delete.templateStat.js'
const router = Router()

// Get
router.get('/', getTemplateStats)
router.get('/:id', getTemplateStat)

// Post
router.post('/', postTemplateStat)

// Put
router.put('/:id', putTemplateStat)

// Delete
router.delete('/:id', deleteTemplateStat)

export default router
