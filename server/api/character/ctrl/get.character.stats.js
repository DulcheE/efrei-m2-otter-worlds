import hal from 'hal'
import Character from '../../../models/character.model'
import { baseAPI } from '../../../api/routes'

export default function getCharacterStats (req, res) {
  Character.getStats(parseInt(req.params.id))
    .then((stats) => {
      const resource = hal.Resource(stats,
        `${baseAPI(req)}characters/${parseInt(req.params.id)}/stats`)
      res.status(200).json(resource)
    })
    .catch(err => res.status(404).json(err.message))
}
