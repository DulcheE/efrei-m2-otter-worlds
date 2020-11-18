import TemplateCategory from '../../models/templateCategory.model'

export default function deleteTemplateCategory (req, res) {
  TemplateCategory.remove(parseInt(req.params.id))
    .then((bSucceded) => {
      if (bSucceded) {
        res.status(200).json(bSucceded)
      } else {
        res.status(404).json(`TemplateCategory ${req.params.id} don't exist !`)
      }
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err.code)
      const jsonErr = { code: err.code, message: 'Error while deleting the new templateCategory.\n' }

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
