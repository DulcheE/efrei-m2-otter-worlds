import Characters from '../../../models/character.model'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getUserCharacter (req, res) {
  const characters = await Characters.getByUser(parseInt(req.params.id))
  res.status(200).json(Characters.asResourceList(req, characters, 'user' + req.url))
}
