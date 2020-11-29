import Keyword from '../../../models/keyword.model'

export default function getKeywords (req, res) {
  // NOTE: remove the "res.status(501).send({ message: 'not implemented' }})"
  //       to make it work
  Keyword.getAll()
    .then((keywords) => {
      res.status(200).json(Keyword.asResourceList(req, keywords))
    })
    .catch(err => res.status(404).json(err.message))
}
