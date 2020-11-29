import Article from '../../../models/article.model'

export default function getArticle (req, res) {
  Article.get(parseInt(req.params.id))
    .then((article) => {
      res.status(200).json(article.asResource(req))
    })
    .catch(err => res.status(404).json(err.message))
}
