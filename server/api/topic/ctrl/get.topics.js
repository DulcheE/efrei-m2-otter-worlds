import Topic from '../../../models/topic.model'

export default function getTopics (req, res) {
  // NOTE: remove the "res.status(501).send({ message: 'not implemented' }})"
  //       to make it work
  Topic.getAll()
    .then((topics) => {
      res.status(200).json(Topic.asResourceList(req, topics))
    })
    .catch(err => res.status(404).json(err.message))
}
