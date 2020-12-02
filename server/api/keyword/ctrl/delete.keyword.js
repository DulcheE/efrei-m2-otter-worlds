import Keyword from '../../../models/keyword.model'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function deleteKeyword (req, res) {
  const bSucceded = await Keyword.remove(parseInt(req.params.id))
  if (bSucceded) {
    res.status(200).json(bSucceded)
  } else {
    res.status(404).json(`Keyword ${req.params.id} don't exist !`)
  }
}
