import Timeline from '../../../models/timeline.model.js'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function putTimeline (req, res) {
  try {
    const timeline = await Timeline.update(parseInt(req.params.id), req.body)
    res.status(200).json(timeline.asResource(baseAPI(req)))
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err.code)
    const jsonErr = { code: err.code, message: 'Error while updating the new template.\n' }

    if (err.code === 'ER_PARAMETER_UNDEFINED') {
      jsonErr.message += 'Missing a parameter.\n'
    } else if (err.code === 'ER_DUP_ENTRY') {
      jsonErr.message += 'Duplicate of a unique row.\n'
    }
    jsonErr.message += 'Please verify that your data is valid !'

    res.status(400).json(jsonErr)
  }
}
