import InterestPoint from '../../../models/interestPoint.model.js'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getInterestPoint (req, res) {
  try {
    const interestPoint = await InterestPoint.get(parseInt(req.params.id))
    res.status(200).json(interestPoint.asResource(baseAPI(req)))
  } catch (err) {
    res.status(404).json(err.message)
  }
}
