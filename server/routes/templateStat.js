import { Router } from 'express'
import getTemplateStats from '../controllers/templatestat/get.templatestats.js'
import getTemplateStat from '../controllers/templatestat/get.templatestat.js'
import postTemplateStat from '../controllers/templatestat/post.templatestat.js'
import putTemplateStat from '../controllers/templatestat/put.templatestat.js'
import deleteTemplateStat from '../controllers/templatestat/delete.templatestat.js'
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
