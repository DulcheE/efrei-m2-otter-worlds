import SubTopic from '../../models/subTopic.model'

export default function getSubTopic (req, res) {
  SubTopic.get(parseInt(req.params.id))
    .then((subTopic) => {
      res.status(200).json(subTopic.asResource(req))
    })
    .catch(err => res.status(404).json(err.message))
}
