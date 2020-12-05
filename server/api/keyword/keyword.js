import { Router } from 'express'

import isConnected from '../../middlewares/is-connected.js'
import passwordConfirmation from '../../middlewares/password-confirmation.js'
import { tryTo, emptyError } from '../../middlewares/errors.js'
import KeywordPolicy from '../../policies/keyword.policy.js'

import getKeywords from './ctrl/get.keywords.js'
import getKeyword from './ctrl/get.keyword.js'
import getKeywordsArticle from './ctrl/get.keyword.articles'
import postKeyword from './ctrl/post.keyword.js'
import deleteKeyword from './ctrl/delete.keyword.js'

const {
  canEditUniverse,
  canGetUniverseIndirect,
  canEditUniverseIndirect
} = require('../../middlewares/access-rights.js')

const canGet = canGetUniverseIndirect(KeywordPolicy.getUniverseId, 'id', 'params')
const canEdit = canEditUniverseIndirect(KeywordPolicy.getUniverseId, 'id', 'params')

const router = Router()

// Get
router.get('/', tryTo(getKeywords, emptyError))
router.get('/:id', canGet, tryTo(getKeyword, emptyError))
router.get('/:id/articles', canGet, tryTo(getKeywordsArticle, emptyError))

// Post
router.post('/', isConnected, canEditUniverse('idUniverse', 'body'), tryTo(postKeyword, emptyError))

// Delete
router.delete('/:id', isConnected, canEdit, passwordConfirmation, tryTo(deleteKeyword, emptyError))

export default router
