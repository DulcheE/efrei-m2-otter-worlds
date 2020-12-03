import Character from '../../../models/character.model'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function postCharacterGroup (req, res) {
  try {
    const bSucceded = await Character.insertInGroup(parseInt(req.params.id), parseInt(req.body.idGroup))
    res.status(201).json(bSucceded)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err.code)
    const jsonErr = { code: err.code, message: 'Error while adding character to group.\n' }

    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
      jsonErr.message += 'No existing user or universe for the given ids.\n'
    } else if (err.code === 'ER_PARAMETER_UNDEFINED') {
      jsonErr.message += 'Missing a parameter.\n'
    } else if (err.code === 'ER_DUP_ENTRY') {
      jsonErr.message += 'Duplicate of a unique row.\n'
    }
    jsonErr.message += 'Please verify that your data is valid !'

    res.status(400).json(jsonErr)
  }
}
