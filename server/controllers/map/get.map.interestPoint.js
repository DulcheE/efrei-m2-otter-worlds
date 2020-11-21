import InterestPoint from '../../models/interestPoint.model.js'

export default function getInterestPoint (req, res) {
  // NOTE: remove the "res.status(501).send({ message: 'not implemented' }})"
  //       to make it work
  InterestPoint.getAllforMap(parseInt(req.params.id))
    .then((interestPoint) => {
      res.status(200).json(InterestPoint.asResourceList(req, interestPoint))
    })
    .catch(err => res.status(404).json(err.message))
}
