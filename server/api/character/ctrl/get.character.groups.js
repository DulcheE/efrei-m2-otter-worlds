import Characters from '../../../models/character.model'
import Group from '../../../models/group.model'

export default function getCharacterGroups (req, res) {
  Characters.getGroups(parseInt(req.params.id))
    .then((groups) => {
      res.status(200).json(Group.asResourceList(req, groups, 'characters' + req.url))
    })
}
