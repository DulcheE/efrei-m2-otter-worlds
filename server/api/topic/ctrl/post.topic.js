import Topic from '../../../models/topic.model'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function postTopic (req, res) {
  try {
    const insertedId = await Topic.add(new Topic(req.body))
    res.status(201).json(insertedId)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err.code)
    const jsonErr = { code: err.code, message: 'Error while creating the new topic.\n' }

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
