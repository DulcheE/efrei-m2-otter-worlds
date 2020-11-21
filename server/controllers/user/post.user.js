import User from '../../models/user.model'

export default function PostUser (req, res) {
  User.add(new User(req.body))
    .then((insertedID) => {
      res.status(201).json(insertedID)
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err.code)
      const jsonErr = { code: err.code }
      if (err.code === 'ER_NO_REFERENCED_ROW_2') {
        jsonErr.message = 'Error while creating the new universe.\nNo existing user for this id.\nPlease verify that your data is valid !'
      } else if (err.code === 'ER_PARAMETER_UNDEFINED') {
        jsonErr.message = 'Error while creating the new universe.\nMissing a parameter.\nPlease verify that your data is valid !'
      } else if (err.code === 'ER_DUP_ENTRY') {
        jsonErr.message = 'Error while creating the new universe.\nDuplicate of a unique row.\nPlease verify that your data is valid !'
      }
      res.status(400).json(jsonErr)
      throw err
    })
}
