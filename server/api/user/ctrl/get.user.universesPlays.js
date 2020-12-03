import Universe from '../../../models/universe.model'
import User from '../../../models/user.model'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getUserUniversePlays (req, res) {
  const universesPlays = await User.getUniversesPlays(parseInt(req.params.id))
  const universesRessource = Universe.asResourceList(baseAPI(req), universesPlays, 'user' + req.url)
  console.log(universesPlays)
  console.log(universesRessource)
  for (let i = 0; i < universesPlays.length; ++i) {
    universesRessource.list[i].bIsGM = !!universesPlays[i].bIsGM
  }
  res.status(200).json(universesRessource)
}
