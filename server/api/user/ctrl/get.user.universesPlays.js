import Universe from '../../../models/universe.model'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getUserUniversesIsPlayingIn (req, res) {
  const universesPlays = await Universe.getByUserIsPlayingIn(parseInt(req.params.id))
  const universesRessource = Universe.asResourceList(baseAPI(req), universesPlays, 'user' + req.url)
  for (let i = 0; i < universesPlays.length; ++i) {
    universesRessource.list[i].bIsGM = !!universesPlays[i].bIsGM
  }
  res.status(200).json(universesRessource)
}
