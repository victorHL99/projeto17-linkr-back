import postsRepository from "../repositories/postsRepository.js"

export async function userPostMiddleware(req, res, next) {
  const { userId } = res.locals
  const { id } = req.params
  try {
    const { rows: posts } = await postsRepository.getPostByUserId(userId, id)
    const [userPost] = posts
    if (!userPost?.id) {
      return res.status(401).send("Post belongs to another user!")
    }
    next()
  } catch (e) {
    return res.status(500).send(e.message)
  }
}
