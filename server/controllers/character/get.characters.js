import Character from '../../models/character.model'

export default function getCharacters (req, res) {
  // NOTE: remove the "res.status(501).send({ message: 'not implemented' }})"
  //       to make it work
  Character.getAll()
    .then((characters) => {
      res.status(200).json(Character.asResourceList(req, characters))
    })
    .catch(err => res.status(404).json(err.message))
}
