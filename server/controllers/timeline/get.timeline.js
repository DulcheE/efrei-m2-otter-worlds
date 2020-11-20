import Timeline from '../../models/timeline.model.js'
import Event from '../../models/event.model.js'

export default function getTimeline (req, res) {
  Timeline.get(parseInt(req.params.id))
    .then((timeline) => {
      const timeline2 = new Timeline(timeline)
      Event.getForTimeline(timeline2.idTimeline)
        .then((events) => {
          timeline2.events = Event.asResourceList(req, events, 'events')
          res.status(200).json(timeline2.asResource(req))
        })
        .catch((err) => {
          res.status(400).json(err.message)
        })
    })
    .catch(err => res.status(404).json(err.message))
}
