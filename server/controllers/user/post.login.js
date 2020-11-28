import User from '../../models/user.model'

export default async function Login (req, res) {
  let user = {}
  try {
    user = await User.getByName(req.body.username)
  } catch (err) {
    console.log(err.code)
    const jsonErr = { code: err.code, message: 'Error while Login.\n' }

    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
      jsonErr.message += 'No existing user for this id.\n'
    } else if (err.code === 'ER_PARAMETER_UNDEFINED') {
      jsonErr.message += 'Missing a parameter.\n'
    }
    jsonErr.message += 'Please verify that your data is valid !'

    res.status(400).json(jsonErr)
    throw err
  }

  console.log('here')

  if (!user || req.body.password !== user.password) {
    res.status(400).json({ message: 'Wrong username or password !' })
  } else {
    delete user.password
    console.log(user.idUser)
    console.log(req.session.idUser)
    req.session.idUser = user.idUser
    console.log(req.session.idUser)
    res.status(200).json(user)
  }
}
