import Template from '../../../models/template.model'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default function getTemplates (req, res) {
  // NOTE: remove the "res.status(501).send({ message: 'not implemented' }})"
  //       to make it work
  Template.getAll()
    .then((templates) => {
      res.status(200).json(Template.asResourceList(baseAPI(req), templates))
    })
}
