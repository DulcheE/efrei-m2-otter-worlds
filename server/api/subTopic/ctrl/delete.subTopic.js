import SubTopic from '../../../models/subTopic.model'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function deleteSubTopic (req, res) {
  const bSucceded = await SubTopic.remove(parseInt(req.params.id))
  if (bSucceded) {
    res.status(200).json(bSucceded)
  } else {
    res.status(404).json(`SubTopic ${req.params.id} don't exist !`)
  }
}
