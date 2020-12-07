import Keyword from '../../../models/keyword.model'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function putKeywordStat (req, res) {
  try {
    await Keyword.updateForArticle(parseInt(req.params.id), req.body)
    res.sendStatus(200)
  } catch (err) {
    res.status(400).json(err.message)
  }
}
