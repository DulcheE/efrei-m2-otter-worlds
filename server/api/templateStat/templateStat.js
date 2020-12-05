import { Router } from 'express'

import isConnected from '../../middlewares/is-connected.js'
import passwordConfirmation from '../../middlewares/password-confirmation.js'
import { tryTo, emptyError } from '../../middlewares/errors.js'
import TemplateStatPolicy from '../../policies/templateStat.policy.js'
import TemplateCategoryPolicy from '../../policies/templateCategory.policy.js'

import getTemplateStats from './ctrl/get.templateStats.js'
import getTemplateStat from './ctrl/get.templateStat.js'
import postTemplateStat from './ctrl/post.templateStat.js'
import putTemplateStat from './ctrl/put.templateStat.js'
import deleteTemplateStat from './ctrl/delete.templateStat.js'

const {
  canGetUniverseIndirect,
  canEditUniverseIndirect
} = require('../../middlewares/access-rights.js')

const canGet = canGetUniverseIndirect(TemplateStatPolicy.getUniverseId, 'id', 'params')
const canAdd = canEditUniverseIndirect(TemplateCategoryPolicy.getUniverseId, 'idTemplateCategory', 'body')
const canEdit = canEditUniverseIndirect(TemplateStatPolicy.getUniverseId, 'id', 'params')

const router = Router()

// Get
router.get('/', tryTo(getTemplateStats, emptyError))
router.get('/:id', canGet, tryTo(getTemplateStat, emptyError))

// Post
router.post('/', isConnected, canAdd, tryTo(postTemplateStat, emptyError))

// Put
router.put('/:id', isConnected, canEdit, tryTo(putTemplateStat, emptyError))

// Delete
router.delete('/:id', isConnected, canEdit, passwordConfirmation, tryTo(deleteTemplateStat, emptyError))

export default router
