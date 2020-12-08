import Character from '../../../models/character.model'
import { baseAPI } from '../../routes'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function putCharacterStatusGameMaster (req, res, next) {
  const { sheetStatus } = req.body
  if (sheetStatus !== 'Rejeted' && sheetStatus !== 'Validated') { next('route'); return }
  try {
    await Character.updateSheetStatus(parseInt(req.params.id), sheetStatus)
    res.status(200).json(true)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err.code)
    const jsonErr = { code: err.code, message: 'Error while updating the new character.\n' }

    if (err.code === 'ER_PARAMETER_UNDEFINED') {
      jsonErr.message += 'Missing a parameter.\n'
    } else if (err.code === 'ER_DUP_ENTRY') {
      jsonErr.message += 'Duplicate of a unique row.\n'
    }
    jsonErr.message += 'Please verify that your data is valid !'

    res.status(400).json(jsonErr)
  }
}
