export async function sharePost(req, res) {
  try {
    const { userId } = res.locals
    const { id } = req.params
    res.sendStatus(201)
  } catch (e) {
    res.status(500).send(e.message)
  }
}
