import Universe from '../../../models/universe.model'

export default function putUniverse (req, res) {
  Universe.updateUserRole(parseInt(req.params.id), parseInt(req.body.idUser), req.body.bIsGM)
    .then((bSucceded) => {
      res.status(200).json(bSucceded)
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err.code)
      const jsonErr = { code: err.code, message: 'Error while updating the new universe.\n' }

      if (err.code === 'ER_PARAMETER_UNDEFINED') {
        jsonErr.message += 'Missing a parameter.\n'
      } else if (err.code === 'ER_DUP_ENTRY') {
        jsonErr.message += 'Duplicate of a unique row.\n'
      }
      jsonErr.message += 'Please verify that your data is valid !'

      res.status(400).json(jsonErr)
      throw err
    })
}
