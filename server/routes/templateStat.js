import { Router } from 'express'
import getTemplateStats from '../controllers/templateStat/get.templateStats.js'
import getTemplateStat from '../controllers/templateStat/get.templateStat.js'
import postTemplateStat from '../controllers/templateStat/post.templateStat.js'
import putTemplateStat from '../controllers/templateStat/put.templateStat.js'
import deleteTemplateStat from '../controllers/templateStat/delete.templateStat.js'
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
