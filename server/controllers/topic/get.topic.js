import Topic from '../../models/topic.model'

export default function getTopic (req, res) {
  Topic.get(parseInt(req.params.id))
    .then((topic) => {
      res.status(200).json(topic.asResource(req))
    })
    .catch(err => res.status(404).json(err.message))
}
