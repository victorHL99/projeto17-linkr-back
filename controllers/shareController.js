import shareRepository from "../repositories/shareRepository.js"

export async function sharePost(req, res) {
  try {
    const { userId } = res.locals
    const { id: postId } = req.params
    await shareRepository.insertRepost(userId, postId)
    res.sendStatus(201)
  } catch (e) {
    res.status(500).send(e.message)
  }
}

export async function getSharedPosts(req, res) {
  try {
    const { rows: reposts } = await shareRepository.getRepost()
    res.send(reposts)
  } catch (e) {
    res.status(500).send(e.message)
  }
}
