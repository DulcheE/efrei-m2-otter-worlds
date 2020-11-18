import { Router } from 'express'
import userRouter from './user.js' // after the import from express
import universeRouter from './universe.js'
import characterRouter from './character.js'
import inventoryRouter from './inventory.js'
import subTopicRouter from './subTopic.js'
import templateCategoryRouter from './templateCategory.js'
import templateStatRouter from './templateStat.js'
import timelineRouter from './timeline.js'
import topicRouter from './topic.js'
const apiRouter = Router()

const apiRoute = '/api/v1/'
const baseAPI = (req) => {
  return req.protocol + '://' + req.get('host') + apiRoute
}

apiRouter.use('/users', userRouter) // before the export default
apiRouter.use('/universes', universeRouter)
apiRouter.use('/characters', characterRouter)
apiRouter.use('/inventories', inventoryRouter)
apiRouter.use('/sub-topics', subTopicRouter)
apiRouter.use('/template-categories', templateCategoryRouter)
apiRouter.use('/template-stats', templateStatRouter)
apiRouter.use('/timelines', timelineRouter)
apiRouter.use('/topics', topicRouter)

apiRouter.get('/', (req, res) => {
  res.json({
    _links: {
      articles: `${baseAPI(req)}articles`,
      characters: `${baseAPI(req)}characters`,
      inventories: `${baseAPI(req)}inventories`,
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

export { apiRouter, apiRoute, baseAPI }
