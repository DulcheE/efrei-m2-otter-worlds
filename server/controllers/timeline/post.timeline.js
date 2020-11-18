import Timeline from '../../models/timeline.model.js'

export default function postTimeline (req, res) {
  Timeline.add(new Timeline(req.body))
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}
