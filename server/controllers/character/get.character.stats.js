import hal from 'hal'
import Character from '../../models/character.model'
import { baseAPI } from '../../routes/routes'

export default function getCharacterStats (req, res) {
  // NOTE: remove the "res.status(501).send({ message: 'not implemented' }})"
  //       to make it work
  Character.getStats(parseInt(req.params.id))
    .then((stats) => {
      const resource = hal.Resource(stats,
        `${baseAPI(req)}characters/${parseInt(req.params.id)}/stats`)
      res.status(200).json(resource)
    })
    .catch(err => res.status(404).json(err.message))
}
