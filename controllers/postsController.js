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

export async function createPost(req, res) {
  console.log("bateu")

  const { sharedUrl, message } = req.body
  const { userId } = res.locals

  try {
    const result = await postsRepository.createPost(userId, sharedUrl, message)
    const lastPost = await postsRepository.getLastPost(message)
    console.log("🚀 ~ lastPost", lastPost)
    verboseConsoleLog("Result:", result)
    const createdPost = {
      ...{ ...lastPost.rows[0] },
    }
    if (result.rowCount === 1) {
      try {
        const metadata = await urlMetadata(sharedUrl)
        console.log("🚀 ~ metadata", metadata)

        createdPost.previewTitle = metadata.title
        createdPost.previewImage = metadata.image
        createdPost.previewDescription = metadata.description
        createdPost.previewUrl = metadata.url

        return res.status(201).send({ ...createdPost })
      } catch (error) {
        verboseConsoleLog("Error:", error)
        return res.status(201).send({ ...createdPost })
      }
    } else return res.sendStatus(400)
  } catch (error) {
    verboseConsoleLog("Error:", error)
    return res.status(500).send(error.message)
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


export async function updatePost(req, res) {
  const { id } = req.params
  const { userId } = res.locals
  const { message, sharedUrl } = req.body 
  try {
    await postsRepository.updatePost(id ,message, userId, sharedUrl)
    res.sendStatus(204)
  } catch (e) {
    return res.status(500).send(e.message)
  }
}
