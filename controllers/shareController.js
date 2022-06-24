import shareRepository from "../repositories/shareRepository.js"

export async function sharePost(req, res) {
  try {
    const { userId } = res.locals
    const { id: postId } = req.params
    await shareRepository.insertRepost(userId, postId)
    res.sendStatus(201)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export async function deleteRepost(req, res) {
  try {
    const { userId } = res.locals
    const { id: postId } = req.params
    await shareRepository.deleteRepost(userId, postId)
    res.sendStatus(204)
  } catch (error) {
    verboseConsoleLog("Error:", error)
    res.status(500).send(error.message)
  }
}
