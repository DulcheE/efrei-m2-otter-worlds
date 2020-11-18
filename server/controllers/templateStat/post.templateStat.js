import TemplateStat from '../../models/templateStat.model'

export default function postTemplateStat (req, res) {
  TemplateStat.add(new TemplateStat(req.body))
    .then((insertedId) => {
      res.status(201).json(insertedId)
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err.code)
      const jsonErr = { code: err.code, message: 'Error while creating the new templateStat.\n' }

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
