/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export default function logout (req, res) {
  req.session.destroy(() => res.json({ success: true }))
}
