import Article from '../../../models/article.model'

export default function getArticleForKeyword (req, res) {
  Article.getAllArticleForKeyword(parseInt(req.params.id))
    .then((articles) => {
      console.log(articles)
      res.status(200).json(Article.asResourceList(req, articles))
    })
    .catch(err => res.status(404).json(err.message))
}
