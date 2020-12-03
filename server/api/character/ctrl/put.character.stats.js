import Character from '../../../models/character.model'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function putCharacterStat (req, res) {
  try {
    await Character.updateStats(parseInt(req.params.id), req.body)
    res.sendStatus(200)
  } catch (err) {
    res.status(400).json(err.message)
  }
}
