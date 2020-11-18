import Universe from '../../models/universe.model'

export default function getUniverse (req, res) {
  Universe.get(parseInt(req.params.id))
    .then((universe) => {
      res.status(200).json(universe.asResource(req))
    })
    .catch(err => res.status(404).json(err.message))
}
