import { Router } from 'express'

import isConnected from '../../middlewares/is-connected.js'
import passwordConfirmation from '../../middlewares/password-confirmation.js'
import { tryTo, emptyError } from '../../middlewares/errors.js'
import ArticlePolicy from '../../policies/article.policy.js'

import getKeywords from './ctrl/get.keywords.js'
import getKeywordArticles from './ctrl/get.keyword.articles'
import postKeyword from './ctrl/post.keyword.js'
import deleteKeyword from './ctrl/delete.keyword.js'

const {
  canGetUniverse,
  canEditUniverseIndirect
} = require('../../middlewares/access-rights.js')

const canEdit = canEditUniverseIndirect(ArticlePolicy.getUniverseId, 'idArticle', 'body')

const router = Router()

// Get
router.get('/', tryTo(getKeywords, emptyError))
router.get('/query', canGetUniverse('universe', 'query'), tryTo(getKeywordArticles, emptyError))

// Post
router.post('/', isConnected, canEdit, tryTo(postKeyword, emptyError))

// Delete
router.delete('/', isConnected, canEdit, passwordConfirmation, tryTo(deleteKeyword, emptyError))

export default router
