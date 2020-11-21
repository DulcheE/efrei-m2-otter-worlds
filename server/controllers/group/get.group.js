import Group from '../../models/group.model'

export default function getGroup (req, res) {
  Group.get(parseInt(req.params.id))
    .then((group) => {
      res.status(200).json(group.asResource(req))
    })
    .catch(err => res.status(404).json(err.message))
}
