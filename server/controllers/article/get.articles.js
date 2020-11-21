import Article from '../../models/article.model'

export default function getArticles (req, res) {
  // NOTE: remove the "res.status(501).send({ message: 'not implemented' }})"
  //       to make it work
  Article.getAll()
    .then((articles) => {
      res.status(200).json(Article.asResourceList(req, articles))
    })
    .catch(err => res.status(404).json(err.message))
}
