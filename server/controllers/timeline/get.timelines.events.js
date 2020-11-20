import Event from '../../models/event.model.js'

export default function getTimelineEvent (req, res) {
  Event.getForTimeline(parseInt(req.params.id))
    .then((events) => {
      res.status(200).json(Event.asResourceList(req, events, 'events'))
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}
