import User from '../../models/user.model'
import Characters from '../../models/character.model'

export default function getUserCharacter (req, res) {
  User.getCharacters(parseInt(req.params.id))
    .then((characters) => {
      res.status(200).json(Characters.asResourceList(req, characters, 'user' + req.url))
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}
