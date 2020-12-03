import Keyword from '../../../models/keyword.model'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function putKeyword (req, res) {
  try {
    const bSucceded = await Keyword.update(parseInt(req.params.id), new Keyword(req.body))
    if (bSucceded) {
      res.status(200).json(bSucceded)
    } else {
      res.status(404).json(`Keyword ${req.params.id} don't exist !`)
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err.code)
    const jsonErr = { code: err.code, message: 'Error while updating the new keyword.\n' }

    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
      jsonErr.message += 'No existing foreigner for a given id.\n'
    } else if (err.code === 'ER_PARAMETER_UNDEFINED') {
      jsonErr.message += 'Missing a parameter.\n'
    } else if (err.code === 'ER_DUP_ENTRY') {
      jsonErr.message += 'Duplicate of a unique row.\n'
    }
    jsonErr.message += 'Please verify that your data is valid !'

    res.status(400).json(jsonErr)
  }
}
