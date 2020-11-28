import Map from '../../../models/map.model.js'
import InterestPoint from '../../../models/interestPoint.model.js'

export default function getTimeline (req, res) {
  Map.get(parseInt(req.params.id))
    .then((map) => {
      const map2 = new Map(map)
      InterestPoint.getAllforMap(map2.idMap)
        .then((interestPoints) => {
          map2.interestPoints = InterestPoint.asResourceList(req, interestPoints, 'interestPoints')
          res.status(200).json(map2.asResource(req))
        })
        .catch((err) => {
          res.status(400).json(err.message)
        })
    })
    .catch(err => res.status(404).json(err.message))
}
