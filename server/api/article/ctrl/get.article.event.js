import Event from '../../../models/event.model'

export default function getArticleEvent (req, res) {
  Event.getForArticle(parseInt(req.params.id))
    .then((events) => {
      res.status(200).json(Event.asResourceList(req, events))
    })
    .catch(err => res.status(404).json(err.message))
}
