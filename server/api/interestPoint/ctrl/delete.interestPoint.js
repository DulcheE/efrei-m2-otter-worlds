import InterestPoint from '../../../models/interestPoint.model'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function deleteTemplate (req, res) {
  const bSucceded = await InterestPoint.remove(parseInt(req.params.id))
  if (bSucceded) {
    res.status(200).json(bSucceded)
  } else {
    res.status(404).json(`InterestPoint ${req.params.id} don't exist !`)
  }
}
