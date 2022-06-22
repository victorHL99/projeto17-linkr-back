import shareRepository from "../repositories/shareRepository.js"

export async function sharePost(req, res) {
  try {
    const { userId } = res.locals
    const { id: postId } = req.params
    const { rows: post } = await shareRepository.getPostInfos(postId)
    const [postInfos] = post
    const { message, shared_url: sharedUrl } = postInfos
    await shareRepository.insertPostShared(userId, postId, message, sharedUrl)
    res.sendStatus(201)
  } catch (e) {
    res.status(500).send(e.message)
  }
}

export async function getSharedPosts(req, res) {
  try {
    const { id: sharedPostId } = req.params
    const { rows: user } = await shareRepository.getUserPostInfos(sharedPostId)
    const [userInfos] = user
    res.send(userInfos)
  } catch (e) {
    res.status(500).send(e.message)
  }
}
