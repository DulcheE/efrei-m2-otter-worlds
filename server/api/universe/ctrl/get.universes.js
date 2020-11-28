import Universe from '../../../models/universe.model'

export default function getUniverses (req, res) {
  // NOTE: remove the "res.status(501).send({ message: 'not implemented' }})"
  //       to make it work
  Universe.getAll()
    .then((universes) => {
      res.status(200).json(Universe.asResourceList(req, universes))
    })
    .catch(err => res.status(404).json(err.message))
}
