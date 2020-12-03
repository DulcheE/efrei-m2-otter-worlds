import Universe from '../../../models/universe.model'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function deleteUniverse (req, res) {
  const bSucceded = await Universe.remove(parseInt(req.params.id))
  if (bSucceded) {
    res.status(200).json(bSucceded)
  } else {
    res.status(404).json(`Universe ${req.params.id} don't exist !`)
  }
}
