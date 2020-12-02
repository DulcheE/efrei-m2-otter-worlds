import Universe from '../../../models/universe.model'
import User from '../../../models/user.model'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getUniverseUsersPlaying (req, res) {
  const usersPlaying = await Universe.getUsersPlaying(parseInt(req.params.id))
  const usersRessource = User.asResourceList(baseAPI(req), usersPlaying, 'universe' + req.url)
  for (let i = 0; i < Object.keys(usersPlaying).length - 1; ++i) {
    usersRessource.users[i].bIsGM = !!usersPlaying[i].bIsGM
  }
  res.status(200).json(usersRessource)
}
