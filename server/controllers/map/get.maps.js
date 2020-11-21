import Map from '../../models/map.model.js'

export default function getTemplates (req, res) {
  // NOTE: remove the "res.status(501).send({ message: 'not implemented' }})"
  //       to make it work
  Map.getAll()
    .then((maps) => {
      res.status(200).json(Map.asResourceList(req, maps))
    })
    .catch(err => res.status(404).json(err.message))
}
