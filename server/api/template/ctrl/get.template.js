import Template from '../../../models/template.model'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default function getTemplate (req, res) {
  Template.get(parseInt(req.params.id))
    .then((template) => {
      res.status(200).json(template.asResource(baseAPI(req)))
    })
    .catch(err => res.status(404).json(err.message))
}
