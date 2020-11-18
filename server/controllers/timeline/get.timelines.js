import Timeline from '../../models/timeline.model.js'

export default function getTimelines (req, res) {
  Timeline.getAll()
    .then((timelines) => {
      res.status(200).json(Timeline.asResourceList(req, timelines))
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}
