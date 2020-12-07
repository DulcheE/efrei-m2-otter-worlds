import hal from 'hal'
import Character from '../../../models/character.model'
import { baseAPI } from '../../routes'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function putCharacterStat (req, res) {
  try {
    const stats = await Character.updateStats(parseInt(req.params.id), req.body)
    const statResources = stats.map((stat) => {
      const resource = hal.Resource({ value: stat.value })
      resource.link('character', baseAPI(req) + 'characters/' + stat.character_idCharacter)
      resource.link('template-stats', baseAPI(req) + 'template-stats/' + stat.templateStat_idTemplateStat)

      return resource.toJSON()
    })
    const resource = { list: statResources }
    res.status(200).send(hal.Resource(resource, baseAPI(req) + 'characters' + req.url))
  } catch (err) {
    res.status(400).json(err.message)
  }
}
