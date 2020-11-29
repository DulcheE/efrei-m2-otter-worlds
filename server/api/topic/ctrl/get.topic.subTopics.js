import Topic from '../../../models/topic.model'
import SubTopics from '../../../models/subTopic.model'

export default function getTopicSubTopics (req, res) {
  // NOTE: remove the "res.status(501).send({ message: 'not implemented' }})"
  //       to make it work
  Topic.getSubTopics(parseInt(req.params.id))
    .then((subTopics) => {
      res.status(200).json(SubTopics.asResourceList(req, subTopics, 'topics' + req.url))
    })
}
