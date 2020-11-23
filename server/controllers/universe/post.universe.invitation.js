import Universe from '../../models/universe.model'

export default function postUniverseInvitation (req, res) {
  Universe.inviteUser(parseInt(req.params.id), parseInt(req.body.idUser), req.body.bIsGM)
    .then((bSucceded) => {
      res.status(201).json(bSucceded)
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err.code)
      const jsonErr = { code: err.code, message: 'Error while creating the new universe.\n' }

      if (err.code === 'ER_NO_REFERENCED_ROW_2') {
        jsonErr.message += 'No existing user for this id.\n'
      } else if (err.code === 'ER_PARAMETER_UNDEFINED') {
        jsonErr.message += 'Missing a parameter.\n'
      } else if (err.code === 'ER_DUP_ENTRY') {
        jsonErr.message += 'Duplicate of a unique row.\n'
      }
      jsonErr.message += 'Please verify that your data is valid !'

      res.status(400).json(jsonErr)
      throw err
    })
}
