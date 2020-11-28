import Map from '../../../models/map.model'

export default function getArticleEvent (req, res) {
  Map.getForArticle(parseInt(req.params.id))
    .then((events) => {
      res.status(200).json(Map.asResourceList(req, events))
    })
    .catch(err => res.status(404).json(err.message))
}
