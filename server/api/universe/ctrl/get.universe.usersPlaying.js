import Universe from '../../../models/universe.model'
import User from '../../../models/user.model'

export default function getUniverseUsersPlaying (req, res) {
  // NOTE: remove the "res.status(501).send({ message: 'not implemented' }})"
  //       to make it work
  Universe.getUsersPlaying(parseInt(req.params.id))
    .then((usersPlaying) => {
      const usersRessource = User.asResourceList(req, usersPlaying, 'universe' + req.url)
      for (let i = 0; i < Object.keys(usersPlaying).length - 1; ++i) {
        usersRessource.users[i].bIsGM = !!usersPlaying[i].bIsGM
      }
      res.status(200).json(usersRessource)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}
