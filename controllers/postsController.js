import postsRepository from "../repositories/postsRepository.js"

import verboseConsoleLog from "../utils/verboseConsoleLog.js"

export async function getPosts(req, res) {
  const { limit, order, direction } = req.query

  try {
    const result = await postsRepository.getPosts(limit, order, direction)
    return res.send(result.rows)
  } catch (error) {
    verboseConsoleLog("Error:", error)
    return res.sendStatus(500)
  }
}

export async function getPostsByHashtag(req, res) {
  const { hashtag } = req.params;

  try {
    const result = await postsRepository.getPostsByHash(hashtag)

    return res.send(result.rows)
  } catch (error) {
    verboseConsoleLog("Error:", error)
    return res.sendStatus(500)
  }
}