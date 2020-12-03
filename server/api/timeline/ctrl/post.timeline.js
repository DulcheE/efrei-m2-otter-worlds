import Timeline from '../../../models/timeline.model.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function postTimeline (req, res) {
  try {
    const result = await Timeline.add(new Timeline(req.body))
    res.status(200).json(result)
  } catch (err) {
    res.status(400).json(err)
  }
}
