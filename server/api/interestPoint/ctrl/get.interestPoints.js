import InterestPoint from '../../../models/interestPoint.model'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getInterestPoints (req, res) {
  const interestPoints = await InterestPoint.getAll()
  res.status(200).json(InterestPoint.asResourceList(baseAPI(req), interestPoints))
}
