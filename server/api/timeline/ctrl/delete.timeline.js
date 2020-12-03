import Timeline from '../../../models/timeline.model'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function deleteTimeline (req, res) {
  const bSucceded = await Timeline.remove(parseInt(req.params.id))
  if (bSucceded) {
    res.status(200).json(bSucceded)
  } else {
    res.status(404).json(`Template ${req.params.id} don't exist !`)
  }
}
