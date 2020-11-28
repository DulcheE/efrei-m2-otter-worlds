import { Router } from 'express'
import articleRouter from './article/article.js'
import authRouter from './auth/auth.js'
import characterRouter from './character/character.js'
import eventsRouter from './event/event.js'
import groupRouter from './group/group.js'
import keywordRouter from './keyword/keyword.js'
import interestPointRouter from './interestPoint/interestPoint.js'
import inventoryRouter from './inventory/inventory.js'
import mapRouter from './map/map.js'
import subTopicRouter from './subTopic/subTopic.js'
import templateCategoryRouter from './templateCategory/templateCategory.js'
import templateStatRouter from './templateStat/templateStat.js'
import timelineRouter from './timeline/timeline.js'
import topicRouter from './topic/topic.js'
import universeRouter from './universe/universe.js'
import userRouter from './user/user.js'
const apiRouter = Router()

const apiRoute = '/api/v1/'
const baseAPI = (req) => {
  return req.protocol + '://' + req.get('host') + apiRoute
}

apiRouter.get('/', (req, res) => {
  res.json({
    _links: {
      articles: `${baseAPI(req)}articles`,
      auth: `${baseAPI(req)}auth`,
      characters: `${baseAPI(req)}characters`,
      events: `${baseAPI(req)}events`,
      groups: `${baseAPI(req)}groups`,
      'interest-points': `${baseAPI(req)}interest-points`,
      inventories: `${baseAPI(req)}inventories`,
      maps: `${baseAPI(req)}maps`,
      subTopics: `${baseAPI(req)}sub-topics`,
      'template-categories': `${baseAPI(req)}template-categories`,
      'template-stats': `${baseAPI(req)}template-stats`,
      timelines: `${baseAPI(req)}timelines`,
      topics: `${baseAPI(req)}topics`,
      universes: `${baseAPI(req)}universes`,
      users: `${baseAPI(req)}users`
    }
  })
})

apiRouter.use('/articles', articleRouter)
apiRouter.use('/auth', authRouter)
apiRouter.use('/characters', characterRouter)
apiRouter.use('/events', eventsRouter)
apiRouter.use('/groups', groupRouter)
apiRouter.use('/keywords', keywordRouter)
apiRouter.use('/interest-points', interestPointRouter)
apiRouter.use('/inventories', inventoryRouter)
apiRouter.use('/maps', mapRouter)
apiRouter.use('/sub-topics', subTopicRouter)
apiRouter.use('/template-categories', templateCategoryRouter)
apiRouter.use('/template-stats', templateStatRouter)
apiRouter.use('/timelines', timelineRouter)
apiRouter.use('/topics', topicRouter)
apiRouter.use('/universes', universeRouter)
apiRouter.use('/users', userRouter)

export { apiRouter, apiRoute, baseAPI }
