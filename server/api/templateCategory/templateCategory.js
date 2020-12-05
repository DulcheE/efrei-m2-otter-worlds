import { Router } from 'express'

import isConnected from '../../middlewares/is-connected.js'
import passwordConfirmation from '../../middlewares/password-confirmation.js'
import { tryTo, emptyError } from '../../middlewares/errors.js'
import TemplateCategoryPolicy from '../../policies/templateCategory.policy.js'

import getTemplateCategories from './ctrl/get.templateCategories.js'
import getTemplateCategory from './ctrl/get.templateCategory.js'
import getTemplateCategoryTemplateStats from './ctrl/get.templateCategory.templateStats.js'
import postTemplateCategory from './ctrl/post.templateCategory.js'
import putTemplateCategory from './ctrl/put.templateCategory.js'
import deleteTemplateCategory from './ctrl/delete.templateCategory.js'

const {
  canEditUniverse,
  canGetUniverseIndirect,
  canEditUniverseIndirect
} = require('../../middlewares/access-rights.js')

const canGet = canGetUniverseIndirect(TemplateCategoryPolicy.getUniverseId, 'id', 'params')
const canEdit = canEditUniverseIndirect(TemplateCategoryPolicy.getUniverseId, 'id', 'params')

const router = Router()

// Get
router.get('/', tryTo(getTemplateCategories, emptyError))
router.get('/:id', canGet, tryTo(getTemplateCategory, emptyError))
router.get('/:id/template-stats', canGet, tryTo(getTemplateCategoryTemplateStats, emptyError))

// Post
router.post('/', isConnected, canEditUniverse('idUniverse', 'body'), tryTo(postTemplateCategory, emptyError))

// Put
router.put('/:id', isConnected, canEdit, tryTo(putTemplateCategory, emptyError))

// Delete
router.delete('/:id', isConnected, canEdit, passwordConfirmation, tryTo(deleteTemplateCategory, emptyError))

export default router
