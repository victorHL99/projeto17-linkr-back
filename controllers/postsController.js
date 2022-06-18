import urlMetadata from "url-metadata"

import postsRepository from "../repositories/postsRepository.js"

import verboseConsoleLog from "../utils/verboseConsoleLog.js"

export async function getPosts(req, res) {
  const { limit, order, direction } = req.query
  const { userId } = req.params

  try {
    const result = await postsRepository.getPosts(
      limit,
      order,
      direction,
      userId,
    )

    for (let i in result.rows) {
      const post = result.rows[i]
      try {
        const metadata = await urlMetadata(post.sharedUrl)

        post.previewTitle = metadata.title
        post.previewImage = metadata.image
        post.previewDescription = metadata.description
        post.previewUrl = metadata.url
      } catch (error) {
        console.log(error)
      }
    }

    verboseConsoleLog("Result:", result.rows)
    return res.send(result.rows)
  } catch (error) {
    verboseConsoleLog("Error:", error)
    return res.sendStatus(500)
  }
}

export async function getPostsByHashtag(req, res) {
  const { hashtag } = req.params

  try {
    const result = await postsRepository.getPostsByHash(hashtag)

    return res.send(result.rows)
  } catch (error) {
    verboseConsoleLog("Error:", error)
    return res.sendStatus(500)
  }
}

export async function deletePost(req, res) {
  const { id } = req.params
  try {
    await postsRepository.deletePostById(id)
    res.sendStatus(204)
  } catch (e) {
    return res.status(500).send(e.message)
  }
}
