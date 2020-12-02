import TemplateStat from '../../../models/templateStat.model'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function deleteTemplateStat (req, res) {
  const bSucceded = await TemplateStat.remove(parseInt(req.params.id))
  if (bSucceded) {
    res.status(200).json(bSucceded)
  } else {
    res.status(404).json(`TemplateStat ${req.params.id} don't exist !`)
  }
}
