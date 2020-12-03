import User from '../../../models/user.model'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getUniverseUsersPlaying (req, res) {
  const usersPlaying = await User.getUsersPlayingInUniverse(parseInt(req.params.id))
  const usersRessource = User.asResourceList(baseAPI(req), usersPlaying, 'universe' + req.url)
  for (let i = 0; i < usersPlaying.length; ++i) {
    usersRessource.list[i].bIsGM = !!usersPlaying[i].bIsGM
  }
  res.status(200).json(usersRessource)
}
