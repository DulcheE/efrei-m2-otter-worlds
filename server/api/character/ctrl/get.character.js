import Character from '../../../models/character.model'

export default function getCharacter (req, res) {
  Character.get(parseInt(req.params.id))
    .then((character) => {
      res.status(200).json(character.asResource(req))
    })
    .catch(err => res.status(404).json(err.message))
}
