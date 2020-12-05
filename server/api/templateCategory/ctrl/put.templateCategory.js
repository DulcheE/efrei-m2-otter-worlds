import TemplateCategory from '../../../models/templateCategory.model'
import { baseAPI } from '../../routes'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function putTemplateCategory (req, res) {
  try {
    const templateCategory = await TemplateCategory.update(parseInt(req.params.id), req.body)
    res.status(200).json(templateCategory.asResource(baseAPI(req)))
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err.code)
    const jsonErr = { code: err.code, message: 'Error while updating the new templateCategory.\n' }

    if (err.code === 'ER_PARAMETER_UNDEFINED') {
      jsonErr.message += 'Missing a parameter.\n'
    } else if (err.code === 'ER_DUP_ENTRY') {
      jsonErr.message += 'Duplicate of a unique row.\n'
    }
    jsonErr.message += 'Please verify that your data is valid !'

    res.status(400).json(jsonErr)
  }
}
