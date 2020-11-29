import Groups from '../../../models/group.model'
import Character from '../../../models/character.model'

export default function getGroupCharacters (req, res) {
  Groups.getCharacters(parseInt(req.params.id))
    .then((characters) => {
      res.status(200).json(Character.asResourceList(req, characters, 'groups' + req.url))
    })
}
