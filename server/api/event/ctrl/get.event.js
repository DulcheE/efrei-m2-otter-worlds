import Event from '../../../models/event.model.js'

export default function getEvent (req, res) {
  Event.get(parseInt(req.params.id))
    .then((event) => {
      res.status(200).json(event.asResource(req))
    })
    .catch(err => res.status(404).json(err.message))
}
