import InterestPoint from '../../models/interestPoint.model'

export default function getArticleEvent (req, res) {
  InterestPoint.getAllforArticle(parseInt(req.params.id))
    .then((interestPoint) => {
      res.status(200).json(InterestPoint.asResourceList(req, interestPoint))
    })
    .catch(err => res.status(404).json(err.message))
}
