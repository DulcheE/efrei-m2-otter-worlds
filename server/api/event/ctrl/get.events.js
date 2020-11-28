import Event from '../../../models/event.model.js'

export default function getTemplates (req, res) {
  // NOTE: remove the "res.status(501).send({ message: 'not implemented' }})"
  //       to make it work
  Event.getAll()
    .then((events) => {
      res.status(200).json(Event.asResourceList(req, events, 'events'))
    })
    .catch(err => res.status(404).json(err.message))
}
