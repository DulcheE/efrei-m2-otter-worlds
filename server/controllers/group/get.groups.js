import Group from '../../models/group.model'

export default function getGroups (req, res) {
  // NOTE: remove the "res.status(501).send({ message: 'not implemented' }})"
  //       to make it work
  Group.getAll()
    .then((groups) => {
      res.status(200).json(Group.asResourceList(req, groups))
    })
    .catch(err => res.status(404).json(err.message))
}
