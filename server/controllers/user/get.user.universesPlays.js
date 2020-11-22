import Universe from '../../models/universe.model'
import User from '../../models/user.model'

export default function getUserUniversePlays (req, res) {
  User.getUniversesPlays(parseInt(req.params.id))
    .then((universPlays) => {
      const universesRessource = Universe.asResourceList(req, universPlays, 'user' + req.url)
      for (let i = 0; i < Object.keys(universPlays).length - 1; ++i) {
        universesRessource.universes[i].bIsGM = !!universPlays[i].bIsGM
      }
      res.status(200).json(universesRessource)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}
