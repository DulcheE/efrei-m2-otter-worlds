import Keyword from '../../../models/keyword.model'

export default function getKeyword (req, res) {
  Keyword.get(parseInt(req.params.id))
    .then((keyword) => {
      res.status(200).json(keyword.asResource(req))
    })
    .catch(err => res.status(404).json(err.message))
}
