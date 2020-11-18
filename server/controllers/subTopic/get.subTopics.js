import SubTopic from '../../models/subTopic.model'

export default function getSubTopics (req, res) {
  // NOTE: remove the "res.status(501).send({ message: 'not implemented' }})"
  //       to make it work
  SubTopic.getAll()
    .then((subTopics) => {
      res.status(200).json(SubTopic.asResourceList(req, subTopics))
    })
    .catch(err => res.status(404).json(err.message))
}
