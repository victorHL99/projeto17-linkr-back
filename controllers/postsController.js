import postsRepository from "../repositories/postsRepository.js"

import verboseConsoleLog from "../utils/verboseConsoleLog.js"

export async function getPosts(req, res) {
  const { limit, order, direction } = req.query

  try {
    const result = await postsRepository.getPosts(limit, order, direction)
    return res.send(result)
  } catch (error) {
    verboseConsoleLog("Error:", error)
    return res.sendStatus(500)
  }
}
