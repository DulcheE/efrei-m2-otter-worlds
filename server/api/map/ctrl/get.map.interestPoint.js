import InterestPoint from '../../../models/interestPoint.model.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getMapInterestPoints (req, res) {
  const interestPoint = await InterestPoint.getAllforMap(parseInt(req.params.id))
  res.status(200).json(InterestPoint.asResourceList(req, interestPoint, 'map' + req.url))
}
