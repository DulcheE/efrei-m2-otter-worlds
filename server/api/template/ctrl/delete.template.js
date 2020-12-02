import Template from '../../../models/template.model'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default function deleteTemplate (req, res) {
  Template.remove(parseInt(req.params.id))
    .then((bSucceded) => {
      if (bSucceded) {
        res.status(200).json(bSucceded)
      } else {
        res.status(404).json(`Template ${req.params.id} don't exist !`)
      }
    })
}
