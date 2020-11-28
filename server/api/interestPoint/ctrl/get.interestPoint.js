import InterestPoint from '../../../models/interestPoint.model.js'

export default function getTemplate (req, res) {
  InterestPoint.get(parseInt(req.params.id))
    .then((interestPoint) => {
      res.status(200).json(interestPoint.asResource(req))
    })
    .catch(err => res.status(404).json(err.message))
}
