import InterestPoint from '../../models/interestPoint.model'

export default function getTemplates (req, res) {
  // NOTE: remove the "res.status(501).send({ message: 'not implemented' }})"
  //       to make it work
  InterestPoint.getAll()
    .then((interestPoints) => {
      res.status(200).json(InterestPoint.asResourceList(req, interestPoints))
    })
    .catch(err => res.status(404).json(err.message))
}
