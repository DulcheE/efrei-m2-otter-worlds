import Keyword from '../../../models/keyword.model'

export default function getArticleKeywords (req, res) {
  Keyword.getAllForArticle(parseInt(req.params.id))
    .then((keywords) => {
      res.status(200).json(Keyword.asResourceList(req, keywords))
    })
    .catch(err => res.status(404).json(err.message))
}
