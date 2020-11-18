import Universe from '../../models/universe.model'
import Characters from '../../models/character.model'

export default function getUniverseCharacters (req, res) {
  // NOTE: remove the "res.status(501).send({ message: 'not implemented' }})"
  //       to make it work
  Universe.getCharacters(parseInt(req.params.id))
    .then((characters) => {
      res.status(200).json(Characters.asResourceList(req, characters, 'universes' + req.url))
    })
}
