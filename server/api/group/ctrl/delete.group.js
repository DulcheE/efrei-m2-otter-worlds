import Group from '../../../models/group.model'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function deleteGroup (req, res) {
  const bSucceded = await Group.remove(parseInt(req.params.id))
  if (bSucceded) {
    res.status(200).json(bSucceded)
  } else {
    res.status(404).json(`Group ${req.params.id} don't exist !`)
  }
}
